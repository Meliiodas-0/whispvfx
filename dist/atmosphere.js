(function () {
  'use strict';

  function initializeAtmosphere() {
    const hero = document.querySelector('.hero');
    const canvas = document.getElementById('atmosphere-canvas');
    const motionButton = document.getElementById('motion-toggle');
    const soundButton = document.getElementById('sound-toggle');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const palettes = {
      veil: '196, 139, 113',
      soul: '143, 184, 216',
      crimson: '226, 99, 75'
    };
    let color = palettes.veil;
    let motionEnabled = !reducedMotion.matches;
    let heroVisible = false;
    let pagePaused = false;
    let frame = 0;
    let sceneFrame = 0;
    let resizeFrame = 0;
    let previousTime = 0;
    let width = 0;
    let height = 0;
    let particles = [];
    let context = null;
    const pointer = { active: false, x: 0, y: 0, sceneX: 0, sceneY: 0 };

    if (canvas) {
      canvas.setAttribute('aria-hidden', 'true');
      try { context = canvas.getContext('2d', { alpha: true }); } catch (_) { /* The artwork remains usable without canvas. */ }
    }

    function canMove() {
      return motionEnabled && !reducedMotion.matches && !document.hidden && !pagePaused && heroVisible;
    }

    function resetScene() {
      pointer.active = false;
      pointer.sceneX = 0;
      pointer.sceneY = 0;
      cancelAnimationFrame(sceneFrame);
      sceneFrame = 0;
      if (!hero) return;
      hero.style.setProperty('--scene-x', '0px');
      hero.style.setProperty('--scene-y', '0px');
      hero.style.setProperty('--scene-scroll', '0px');
    }

    function updateMotionControl() {
      const enabled = motionEnabled && !reducedMotion.matches;
      if (hero) hero.dataset.motion = canMove() ? 'on' : 'off';
      if (!motionButton) return;
      motionButton.setAttribute('aria-pressed', String(enabled));
      motionButton.disabled = reducedMotion.matches;
      motionButton.title = reducedMotion.matches
        ? 'Motion is off because your device prefers reduced motion.'
        : 'Toggle atmospheric motion';
      const label = motionButton.querySelector('[data-motion-label]');
      if (label) label.textContent = enabled ? 'Motion on' : 'Motion off';
    }

    function updateScene() {
      sceneFrame = 0;
      if (!hero || !canMove()) return;
      const scroll = Math.min(60, Math.max(0, -hero.getBoundingClientRect().top * 0.085));
      hero.style.setProperty('--scene-x', pointer.sceneX.toFixed(2) + 'px');
      hero.style.setProperty('--scene-y', pointer.sceneY.toFixed(2) + 'px');
      hero.style.setProperty('--scene-scroll', scroll.toFixed(2) + 'px');
    }

    function scheduleScene() {
      if (hero && canMove() && !sceneFrame) sceneFrame = requestAnimationFrame(updateScene);
    }

    function sizeCanvas() {
      if (!canvas || !context || !hero) return;
      const oldWidth = width;
      const oldHeight = height;
      width = Math.max(1, canvas.clientWidth || hero.clientWidth);
      height = Math.max(1, canvas.clientHeight || hero.clientHeight);
      const ratio = Math.min(1.5, window.devicePixelRatio || 1);
      const pixelWidth = Math.round(width * ratio);
      const pixelHeight = Math.round(height * ratio);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = width < 700 ? 25 : 50;
      if (particles.length !== count) {
        particles = Array.from({ length: count }, function (_, index) {
          return {
            x: Math.random() * width,
            y: Math.random() * height,
            depth: 0.25 + Math.random() * 0.75,
            speed: 4 + Math.random() * 8,
            phase: Math.random() * Math.PI * 2,
            streak: index % 5 === 0
          };
        });
      } else if (oldWidth && oldHeight) {
        particles.forEach(function (particle) {
          particle.x *= width / oldWidth;
          particle.y *= height / oldHeight;
        });
      }
    }

    // Small points and short light traces leave the main artwork in focus.
    function draw(time, delta) {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      if (!heroVisible || document.hidden || pagePaused) return;
      particles.forEach(function (particle) {
        let proximity = 0;
        if (delta) {
          particle.x += Math.sin(time * 0.00018 + particle.phase) * particle.depth * delta * 3;
          particle.y -= particle.speed * particle.depth * delta;
          if (pointer.active) {
            const dx = particle.x - pointer.x;
            const dy = particle.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance > 0.01 && distance < 200) {
              proximity = 1 - distance / 200;
              // The central field repels; its faint outer ring draws points inward.
              const force = distance < 95 ? (1 - distance / 95) * 24 : -(1 - (distance - 95) / 105) * 3;
              particle.x += dx / distance * force * particle.depth * delta;
              particle.y += dy / distance * force * particle.depth * delta;
            }
          }
          if (particle.y < -12) particle.y = height + 12;
          if (particle.y > height + 12) particle.y = -12;
          if (particle.x < -12) particle.x = width + 12;
          if (particle.x > width + 12) particle.x = -12;
        }
        const pulse = 0.85 + Math.sin(time * 0.0005 + particle.phase) * 0.15;
        const alpha = (0.16 + particle.depth * 0.25 + proximity * 0.08) * pulse;
        context.fillStyle = 'rgba(' + color + ', ' + alpha.toFixed(3) + ')';
        context.shadowColor = 'rgba(' + color + ', 0.3)';
        context.shadowBlur = particle.depth > 0.7 ? 6 : 0;
        context.beginPath();
        context.arc(particle.x, particle.y, 0.35 + particle.depth * 0.75, 0, Math.PI * 2);
        context.fill();
        if (particle.streak) {
          context.shadowBlur = 0;
          context.strokeStyle = 'rgba(' + color + ', ' + (alpha * 0.3).toFixed(3) + ')';
          context.lineWidth = 0.5;
          context.beginPath();
          context.moveTo(particle.x, particle.y + 2);
          context.lineTo(particle.x - particle.depth * 2, particle.y + 6 + particle.depth * 7);
          context.stroke();
        }
      });
      context.shadowBlur = 0;
    }

    function animate(time) {
      frame = 0;
      if (!canMove() || !context) return;
      const delta = previousTime ? Math.min(0.05, (time - previousTime) / 1000) : 0;
      previousTime = time;
      draw(time, delta);
      frame = requestAnimationFrame(animate);
    }

    function reconcileMotion() {
      updateMotionControl();
      if (canMove()) {
        if (context && !frame) frame = requestAnimationFrame(animate);
        scheduleScene();
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;
        resetScene();
        draw(0, 0);
      }
    }

    function measureVisibility() {
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      heroVisible = rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
    }

    function onResize() {
      if (document.hidden || pagePaused || resizeFrame) return;
      resizeFrame = requestAnimationFrame(function () {
        resizeFrame = 0;
        measureVisibility();
        sizeCanvas();
        reconcileMotion();
      });
    }

    if (motionButton) {
      motionButton.addEventListener('click', function () {
        if (reducedMotion.matches) return;
        motionEnabled = !motionEnabled;
        reconcileMotion();
      });
    }
    function onMotionPreferenceChange() {
      if (reducedMotion.matches) motionEnabled = false;
      reconcileMotion();
    }
    if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', onMotionPreferenceChange);
    else reducedMotion.addListener(onMotionPreferenceChange);

    if (hero) {
      hero.addEventListener('pointermove', function (event) {
        if (!canMove() || event.pointerType === 'touch') return;
        const rect = hero.getBoundingClientRect();
        pointer.active = true;
        pointer.x = event.clientX - rect.left;
        pointer.y = event.clientY - rect.top;
        pointer.sceneX = (pointer.x / Math.max(1, rect.width) - 0.5) * 12;
        pointer.sceneY = (pointer.y / Math.max(1, rect.height) - 0.5) * 8;
        scheduleScene();
      }, { passive: true });
      hero.addEventListener('pointerleave', function () {
        pointer.active = false;
        pointer.sceneX = 0;
        pointer.sceneY = 0;
        scheduleScene();
      }, { passive: true });
      if ('IntersectionObserver' in window) {
        const intersectionObserver = new IntersectionObserver(function (entries) {
          heroVisible = entries[0].isIntersecting;
          reconcileMotion();
        }, { threshold: 0 });
        intersectionObserver.observe(hero);
      }
      if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(hero);
    }
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('scroll', function () {
      if (!('IntersectionObserver' in window)) {
        const wasVisible = heroVisible;
        measureVisibility();
        if (wasVisible !== heroVisible) reconcileMotion();
      }
      scheduleScene();
    }, { passive: true });
    window.addEventListener('whisp:realm-change', function (event) {
      const realm = event.detail && event.detail.realm;
      if (!Object.prototype.hasOwnProperty.call(palettes, realm)) return;
      color = palettes[realm];
      if (!canMove()) draw(0, 0);
    });

    // Audio is built only inside the sound button's first activation.
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    let audioContext = null;
    let masterGain = null;
    let soundEnabled = false;
    let audioRevision = 0;
    let suspendTimer = 0;

    function updateSoundControl() {
      if (!soundButton) return;
      soundButton.setAttribute('aria-pressed', String(soundEnabled));
      const label = soundButton.querySelector('[data-sound-label]');
      if (label) label.textContent = soundEnabled ? 'Sound on' : 'Sound off';
    }

    function createAudio() {
      audioContext = new AudioContextClass();
      masterGain = audioContext.createGain();
      masterGain.gain.value = 0;
      masterGain.connect(audioContext.destination);

      const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
      const samples = noiseBuffer.getChannelData(0);
      for (let index = 0; index < samples.length; index++) samples[index] = Math.random() * 2 - 1;
      const noise = audioContext.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;
      const airFilter = audioContext.createBiquadFilter();
      airFilter.type = 'bandpass';
      airFilter.frequency.value = 720;
      airFilter.Q.value = 0.65;
      const airGain = audioContext.createGain();
      airGain.gain.value = 0.12;
      noise.connect(airFilter).connect(airGain).connect(masterGain);
      noise.start();

      [110, 164.95].forEach(function (frequency, index) {
        const oscillator = audioContext.createOscillator();
        const voiceGain = audioContext.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        voiceGain.gain.value = index ? 0.045 : 0.11;
        oscillator.connect(voiceGain).connect(masterGain);
        oscillator.start();
      });
    }

    function fadeSound(value, duration) {
      if (!audioContext || !masterGain) return;
      const now = audioContext.currentTime;
      const gain = masterGain.gain;
      if (typeof gain.cancelAndHoldAtTime === 'function') gain.cancelAndHoldAtTime(now);
      else {
        const current = gain.value;
        gain.cancelScheduledValues(now);
        gain.setValueAtTime(current, now);
      }
      gain.linearRampToValueAtTime(value, now + duration);
    }

    function suspendAudio() {
      if (audioContext && audioContext.state !== 'closed') audioContext.suspend().catch(function () {});
    }

    function setSound(enabled, immediately) {
      soundEnabled = Boolean(enabled && AudioContextClass && !document.hidden && !pagePaused);
      const revision = ++audioRevision;
      clearTimeout(suspendTimer);
      updateSoundControl();
      if (!soundEnabled) {
        fadeSound(0, immediately ? 0 : 0.35);
        if (immediately) suspendAudio();
        else suspendTimer = window.setTimeout(function () {
          if (revision === audioRevision && !soundEnabled) suspendAudio();
        }, 400);
        return;
      }
      try {
        if (!audioContext) createAudio();
        audioContext.resume().then(function () {
          if (revision !== audioRevision) {
            if (!soundEnabled) suspendAudio();
            return;
          }
          if (audioContext.state !== 'running' || document.hidden || pagePaused) {
            setSound(false, true);
            return;
          }
          fadeSound(0.055, 1.4);
        }).catch(function () {
          if (revision === audioRevision) {
            setSound(false, true);
            if (soundButton) soundButton.title = 'Sound could not start. Select to try again.';
          }
        });
      } catch (_) {
        setSound(false, true);
        if (soundButton) soundButton.title = 'Ambient sound is unavailable in this browser.';
      }
    }

    if (soundButton) {
      soundButton.disabled = !AudioContextClass;
      soundButton.title = AudioContextClass ? 'Toggle quiet ambient sound' : 'Ambient sound is unavailable in this browser.';
      soundButton.addEventListener('click', function () { setSound(!soundEnabled, false); });
      updateSoundControl();
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = 0;
        setSound(false, true);
      } else {
        measureVisibility();
        sizeCanvas();
      }
      reconcileMotion();
    });
    window.addEventListener('pagehide', function () {
      pagePaused = true;
      cancelAnimationFrame(resizeFrame);
      resizeFrame = 0;
      setSound(false, true);
      reconcileMotion();
    });
    window.addEventListener('pageshow', function () {
      pagePaused = false;
      measureVisibility();
      sizeCanvas();
      reconcileMotion();
    });

    measureVisibility();
    sizeCanvas();
    reconcileMotion();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeAtmosphere, { once: true });
  else initializeAtmosphere();
})();
