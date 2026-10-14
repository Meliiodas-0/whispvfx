/* Foreground roots are drawn paths. Scroll position carries light through them. */
(function () {
  'use strict';
  const overlay = document.getElementById('foreground-vines');
  if (!overlay) return;
  const ns = 'http://www.w3.org/2000/svg';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motion = document.getElementById('motion-toggle');
  const signals = [];
  let frame = 0;
  let pagePaused = false;

  function element(name, attributes, parent) {
    const node = document.createElementNS(ns, name);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    if (parent) parent.append(node);
    return node;
  }

  const trunks = [
    'M -18 -40 C 112 46 -23 125 31 213 C 89 302 -7 352 30 451 C 74 547 -20 601 27 700 C 80 801 -17 855 27 953 C 45 1000 5 1040 8 1080',
    'M 18 -40 C -33 74 70 111 34 208 C -4 310 70 375 28 460 C -13 549 65 622 31 711 C -4 807 69 888 24 996 C 10 1030 25 1063 28 1090',
    'M -13 58 C 46 133 0 207 17 288 C 43 366 6 439 21 528 C 49 614 1 697 17 782 C 45 870 5 929 14 1040'
  ];
  const branches = [
    'M 30 119 C 56 113 66 89 71 59 C 75 30 95 18 114 7',
    'M 49 173 C 85 181 89 213 111 228 C 125 240 140 231 145 218',
    'M 29 235 C 56 254 91 258 99 294 C 105 321 117 326 139 333',
    'M 28 351 C 59 354 79 333 85 308',
    'M 28 451 C 55 433 85 437 97 413 C 109 389 125 381 147 387',
    'M 42 505 C 77 512 67 553 96 569 C 120 582 137 566 140 551',
    'M 24 606 C 60 610 63 639 87 643 C 103 648 115 640 119 626',
    'M 28 701 C 58 693 65 667 66 648',
    'M 39 760 C 65 772 77 809 110 806 C 129 805 137 791 147 785',
    'M 24 865 C 69 878 60 908 96 922 C 114 928 126 920 132 904',
    'M 31 955 C 61 940 78 960 80 984 C 82 1003 99 1009 121 1014'
  ];
  const fibres = [
    'M 69 59 C 48 40 56 16 65 0',
    'M 98 291 C 77 289 78 315 67 328',
    'M 97 414 C 82 399 98 374 90 358',
    'M 95 569 C 99 595 80 604 81 623',
    'M 110 806 C 103 831 122 846 133 850',
    'M 81 984 C 58 991 59 1017 49 1030'
  ];

  function signal(parent, path, phase, width, side) {
    const halo = element('path', { d: path, pathLength: 1000, class: 'vine-signal vine-halo',
      'stroke-width': width * 3.3, 'stroke-dasharray': '45 955', filter: `url(#vine-bloom-${side})` }, parent);
    const core = element('path', { d: path, pathLength: 1000, class: 'vine-signal vine-light',
      'stroke-width': width, 'stroke-dasharray': '27 973' }, parent);
    let glint = null;
    let glintHalo = null;
    let length = 0;
    if (width > 1) {
      length = core.getTotalLength();
      glintHalo = element('circle', { r: '5', class: 'vine-signal vine-glint-halo', filter: `url(#vine-bloom-${side})` }, parent);
      glint = element('circle', { r: '1.7', class: 'vine-signal vine-glint' }, parent);
    }
    signals.push({ halo, core, phase, glint, glintHalo, length });
  }

  ['left', 'right'].forEach((side, index) => {
    const svg = element('svg', { viewBox: '0 0 160 1000', preserveAspectRatio: 'none',
      class: `vine-side vine-${side}`, 'aria-hidden': 'true', focusable: 'false' }, overlay);
    const defs = element('defs', {}, svg);
    const bark = element('linearGradient', { id: `vine-bark-${side}`, x1: '0', y1: '0', x2: '1', y2: '0' }, defs);
    [['0', '#100e15'], ['.33', '#32222a'], ['.59', '#68443d'], ['.74', '#34212a'], ['1', '#100e15']].forEach(([offset, color]) => element('stop', { offset, 'stop-color': color }, bark));
    const texture = element('filter', { id: `vine-grain-${side}`, x: '-15%', y: '-2%', width: '130%', height: '104%' }, defs);
    element('feTurbulence', { type: 'fractalNoise', baseFrequency: '.055 .12', numOctaves: '2', seed: String(12 + index), result: 'grain' }, texture);
    element('feDisplacementMap', { in: 'SourceGraphic', in2: 'grain', scale: '1.7', xChannelSelector: 'R', yChannelSelector: 'G' }, texture);
    const bloom = element('filter', { id: `vine-bloom-${side}`, x: '-100%', y: '-20%', width: '300%', height: '140%' }, defs);
    element('feGaussianBlur', { stdDeviation: '2.4' }, bloom);
    const roots = element('g', { fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      ...(index ? { transform: 'translate(160 -75) scale(-1 1.16)' } : {}) }, svg);
    const wood = element('g', { filter: `url(#vine-grain-${side})` }, roots);
    trunks.forEach((d, i) => {
      const width = [16, 9, 3.5][i];
      element('path', { d, stroke: '#07080cd9', 'stroke-width': width + 5 }, wood);
      element('path', { d, stroke: `url(#vine-bark-${side})`, 'stroke-width': width }, wood);
      element('path', { d, stroke: '#967064', 'stroke-width': '.65', opacity: '.45', transform: 'translate(2 0)' }, wood);
      element('path', { d, stroke: '#17111b', 'stroke-width': '1.4', transform: 'translate(-2 0)' }, wood);
    });
    branches.forEach((d, i) => {
      element('path', { d, stroke: '#120e17', 'stroke-width': '5' }, wood);
      element('path', { d, stroke: '#5b393b', 'stroke-width': '2.6' }, wood);
      element('path', { d, stroke: '#a37b69', 'stroke-width': '.55', opacity: '.4' }, wood);
      if (i % 3 === index) signal(roots, d, i * 83 + index * 240, .8, side);
    });
    fibres.forEach(d => element('path', { d, stroke: '#7b5654', 'stroke-width': '.7', opacity: '.55' }, roots));
    trunks.slice(0, 2).forEach((d, i) => signal(roots, d, i * 450 + index * 280, 1.5, side));
  });

  function allowed() {
    return !reduced.matches && !pagePaused && !document.hidden &&
      motion?.getAttribute('aria-pressed') !== 'false' && !document.querySelector('dialog[open]');
  }
  function update() {
    frame = 0;
    const moving = allowed();
    const y = Math.max(0, window.scrollY);
    overlay.dataset.motion = moving ? 'on' : 'off';
    overlay.dataset.progress = (y / Math.max(1, document.documentElement.scrollHeight - innerHeight)).toFixed(4);
    signals.forEach(({ halo, core, phase, glint, glintHalo, length }) => {
      // Normalized path lengths make the same pulse travel through trunks and twigs.
      const offset = moving ? -(y * .48 + phase) : -phase;
      halo.setAttribute('stroke-dashoffset', offset.toFixed(2));
      core.setAttribute('stroke-dashoffset', offset.toFixed(2));
      if (glint) {
        const point = core.getPointAtLength(((-offset + 13) % 1000) / 1000 * length);
        [glint, glintHalo].forEach(node => {
          node.setAttribute('cx', point.x.toFixed(2));
          node.setAttribute('cy', point.y.toFixed(2));
        });
      }
    });
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(update); }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('pagehide', () => { pagePaused = true; cancelAnimationFrame(frame); frame = 0; update(); });
  window.addEventListener('pageshow', () => { pagePaused = false; schedule(); });
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', schedule);
  if (motion) new MutationObserver(schedule).observe(motion, { attributes: true, attributeFilter: ['aria-pressed'] });
  document.querySelectorAll('dialog').forEach(dialog => new MutationObserver(schedule).observe(dialog, { attributes: true, attributeFilter: ['open'] }));
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.body);
  update();
})();
