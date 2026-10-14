// Small gallery loops are loaded only as their cards enter the viewport.
(function () {
  'use strict';
  const cards = [...document.querySelectorAll('#gallery .project')];
  const toggle = document.getElementById('preview-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = !reducedMotion.matches && !navigator.connection?.saveData;
  let pagePaused = false;
  let preferred = null;
  let frame = 0;
  const visible = new Set();
  const failed = new Set();
  const active = new Set();

  function stop(card) {
    active.delete(card);
    card.querySelector('.project-preview').pause();
    card.classList.remove('preview-playing');
  }
  function canPlay() {
    return enabled && !reducedMotion.matches && !pagePaused && !document.hidden && !document.querySelector('dialog[open]');
  }
  function update() {
    frame = 0;
    const available = cards.filter(card => visible.has(card) && !card.hidden && !failed.has(card));
    if (preferred && available.includes(preferred)) available.unshift(...available.splice(available.indexOf(preferred), 1));
    const selected = new Set(canPlay() ? available.slice(0, 2) : []);
    cards.forEach(card => {
      if (!selected.has(card)) { stop(card); return; }
      if (active.has(card)) return;
      const video = card.querySelector('.project-preview');
      active.add(card);
      if (!video.hasAttribute('src')) {
        video.src = video.dataset.src;
        video.load();
      }
      video.muted = true;
      video.play().catch(() => {
        // A poster and the full reel remain available if autoplay is blocked.
        stop(card);
      });
    });
    toggle.setAttribute('aria-pressed', String(enabled && !reducedMotion.matches));
    toggle.querySelector('span').textContent = enabled && !reducedMotion.matches ? 'Previews on' : 'Previews off';
    toggle.disabled = reducedMotion.matches;
    toggle.title = reducedMotion.matches ? 'Previews are off because your device prefers reduced motion.' : 'Toggle silent video previews';
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(update); }

  cards.forEach(card => {
    const video = card.querySelector('.project-preview');
    video.muted = true;
    video.addEventListener('playing', () => {
      if (active.has(card) && canPlay() && !card.hidden) card.classList.add('preview-playing');
      else stop(card);
    });
    video.addEventListener('error', () => { failed.add(card); stop(card); schedule(); });
    card.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') { preferred = card; schedule(); } });
    card.addEventListener('pointerleave', () => { if (preferred === card) preferred = null; schedule(); });
    card.addEventListener('focusin', () => { preferred = card; schedule(); });
    card.addEventListener('focusout', () => { if (preferred === card) preferred = null; schedule(); });
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting && entry.intersectionRatio >= 0.35) visible.add(entry.target); else visible.delete(entry.target); });
      schedule();
    }, { threshold: [0, 0.35, 0.75] });
    cards.forEach(card => observer.observe(card));
  } else {
    function measure() {
      cards.forEach(card => { const rect = card.getBoundingClientRect(); if (rect.bottom > 0 && rect.top < innerHeight) visible.add(card); else visible.delete(card); });
      schedule();
    }
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    measure();
  }
  toggle.addEventListener('click', () => { enabled = !enabled; update(); });
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) enabled = false; update(); });
  document.addEventListener('visibilitychange', update);
  window.addEventListener('pagehide', () => { pagePaused = true; update(); });
  window.addEventListener('pageshow', () => { pagePaused = false; schedule(); });
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', update));
  document.querySelectorAll('dialog').forEach(dialog => {
    new MutationObserver(update).observe(dialog, { attributes: true, attributeFilter: ['open'] });
    dialog.addEventListener('close', schedule);
  });
  update();
})();
