const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-header nav');
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); nav.classList.toggle('open', open); });
nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); } });
document.getElementById('year').textContent = new Date().getFullYear();

const projects = {
  "scarlet-ascension": {
    "title": "Scarlet Ascension",
    "category": "Soul & magic / Unreal Engine",
    "realm": "crimson",
    "image": "assets/reels/scarlet-ascension.webp",
    "video": "assets/reels/scarlet-ascension.mp4",
    "alt": "A floating figure channeling a crimson beam and dual-hand magic.",
    "description": "A stream of scarlet energy meets a suspended figure, gathering at the chest while twin orbs of hand magic pulse on either side.",
    "tags": [
      "Character magic",
      "Energy absorption",
      "Crimson beam"
    ],
    "duration": "0:12",
    "credit": "Whisp VFX studio",
    "audio": "Silent reel"
  },
  "spectral-serpent": {
    "title": "Spectral Serpent",
    "category": "Soul & magic / Unreal Engine",
    "realm": "soul",
    "image": "assets/reels/spectral-serpent.webp",
    "video": "assets/reels/spectral-serpent.mp4",
    "alt": "A silver-violet serpent rising from a ring of spectral energy.",
    "description": "A coiled silhouette becomes a luminous serpent. Wisps of violet energy trace its emergence and keep the motion readable against the dark test scene.",
    "tags": [
      "Spectral form",
      "Summoning",
      "Violet energy"
    ],
    "duration": "0:12",
    "credit": "Whisp VFX studio",
    "audio": "Silent reel"
  },
  "celestial-orbit": {
    "title": "Celestial Orbit",
    "category": "Soul & magic / Unreal Engine",
    "realm": "soul",
    "image": "assets/reels/celestial-orbit.webp",
    "video": "assets/reels/celestial-orbit.mp4",
    "alt": "Golden orbital rings and small luminous spheres circling a pillar of light.",
    "description": "A bright central column anchors a moving constellation of rings, spheres, and fine particles. The capture includes both the full effect and a closer view of its motion.",
    "tags": [
      "Orbital motion",
      "Light column",
      "Particle detail"
    ],
    "duration": "0:16",
    "credit": "Whisp VFX studio",
    "audio": "Silent reel"
  },
  "fourfold-frost": {
    "title": "Fourfold Frost",
    "category": "Elemental / Unreal Engine",
    "realm": "crimson",
    "image": "assets/reels/fourfold-frost.webp",
    "video": "assets/reels/fourfold-frost.mp4",
    "alt": "Four rings of ice erupting into thick crystalline formations.",
    "description": "Four synchronized frost bursts expand across the ground, building from pale circular traces into dense ice crystals and bright plumes.",
    "tags": [
      "Ice crystals",
      "Ground burst",
      "Fourfold impact"
    ],
    "duration": "0:06",
    "credit": "Whisp VFX studio",
    "audio": "Silent reel"
  },
  "arcane-convergence": {
    "title": "Arcane Convergence",
    "category": "Soul & magic / Unreal Engine",
    "realm": "soul",
    "image": "assets/reels/arcane-convergence.webp",
    "video": "assets/reels/arcane-convergence.mp4",
    "alt": "Three luminous spell cores suspended above a circular golden sigil.",
    "description": "Thin circular traces gather into a wide sigil while three glowing cores take shape above it. Restrained gold and white light define the sequence.",
    "tags": [
      "Magic circle",
      "Converging cores",
      "Golden light"
    ],
    "duration": "0:09",
    "credit": "Whisp VFX studio",
    "audio": "Silent reel"
  },
  "violet-aegis": {
    "title": "Violet Aegis",
    "category": "Soul & magic / Unreal Engine",
    "realm": "soul",
    "image": "assets/reels/violet-aegis.webp",
    "video": "assets/reels/violet-aegis.mp4",
    "alt": "A glowing violet dome crossed by branching white energy.",
    "description": "A hemispherical shield glows with violet light while bright branching lines travel across its surface, defining the curvature of the barrier.",
    "tags": [
      "Energy shield",
      "Branching light",
      "Violet dome"
    ],
    "duration": "0:05",
    "credit": "Whisp VFX studio",
    "audio": "Silent reel"
  },
  "crimson-hand-magic": {
    "title": "Crimson Hand Magic",
    "category": "Soul & magic / Unreal Engine",
    "realm": "crimson",
    "image": "assets/reels/crimson-hand-magic.webp",
    "video": "assets/reels/crimson-hand-magic.mp4",
    "alt": "A luminous red orb hovering over an outstretched hand.",
    "description": "A concentrated crimson orb turns above an open palm. Fine tendrils and a shifting outer shell give the compact effect a living rhythm.",
    "tags": [
      "Hand magic",
      "Energy orb",
      "Fine tendrils"
    ],
    "duration": "0:18",
    "credit": "Whisp VFX studio",
    "audio": "Silent reel"
  },
  "crimson-rift": {
    "title": "Crimson Rift",
    "category": "Elemental / Unreal Engine",
    "realm": "crimson",
    "image": "assets/reels/crimson-rift.webp",
    "video": "assets/reels/crimson-rift.mp4",
    "alt": "Dark red spikes rising around a circular ground rift.",
    "description": "Concentric crimson traces form on the ground before a ring of jagged spikes rises around them. The eruption settles into an ash-like finish.",
    "tags": [
      "Ground rift",
      "Anticipation",
      "Ash ending"
    ],
    "duration": "0:08",
    "credit": "Whisp VFX studio",
    "audio": "Silent reel"
  },
  "crimson-flow-beam": {
    "title": "Crimson Flow Beam",
    "category": "Soul & magic / Unreal Engine",
    "realm": "crimson",
    "image": "assets/reels/crimson-flow-beam.webp",
    "video": "assets/reels/crimson-flow-beam.mp4",
    "alt": "Flowing red ribbons forming an energy beam against darkness.",
    "description": "Layered crimson ribbons twist into a continuous beam. The flowing strands carry energy toward a bright focal point at the far end.",
    "tags": [
      "Energy beam",
      "Ribbon flow",
      "Crimson light"
    ],
    "duration": "0:12",
    "credit": "Whisp VFX studio",
    "audio": "Silent reel"
  },
  "void-orb": {
    "title": "Void Orb",
    "category": "Soul & magic / Unreal Engine",
    "realm": "soul",
    "image": "assets/reels/void-orb.webp",
    "video": "assets/reels/void-orb.mp4",
    "alt": "A dark violet orb wrapped in swirling spectral strands.",
    "description": "Violet strands orbit a dark core as soft purple wisps spill outward. The moving shell gives the sphere a restless, unstable silhouette.",
    "tags": [
      "Dark core",
      "Orbital strands",
      "Purple wisps"
    ],
    "duration": "0:05",
    "credit": "Whisp VFX studio",
    "audio": "Silent reel"
  },
  "red-lance": {
    "title": "Red Lance",
    "category": "Soul & magic / Unreal Engine",
    "realm": "crimson",
    "image": "assets/reels/red-lance.webp",
    "video": "assets/reels/red-lance.mp4",
    "alt": "A red energy lance launching through a bright circular ring.",
    "description": "A small point of light draws inward, flares, and releases a narrow red lance. A ring and trailing filaments accent the short, sharp release.",
    "tags": [
      "Inward charge",
      "Projectile",
      "Energy trail"
    ],
    "duration": "0:02",
    "credit": "Whisp VFX studio",
    "audio": "Silent reel"
  },
  "storm-descent": {
    "title": "Storm Descent",
    "category": "Atmosphere / Unreal Engine",
    "realm": "veil",
    "image": "assets/reels/storm-descent.webp",
    "video": "assets/reels/storm-descent.mp4",
    "alt": "A dark red cloud sending a twisting energy column down through a blue sky.",
    "description": "A dark cloud hangs overhead as a thin column of turbulent energy descends beneath it. Red light punctuates the falling trail against the blue sky.",
    "tags": [
      "Sky effect",
      "Energy column",
      "Dark cloud"
    ],
    "duration": "0:06",
    "credit": "Whisp VFX studio",
    "audio": "Silent reel"
  },
  "rose-shatter": {
    "title": "Rose Shatter",
    "category": "Soul & magic / Unreal Engine",
    "realm": "crimson",
    "image": "assets/reels/rose-shatter.webp",
    "video": "assets/reels/rose-shatter.mp4",
    "alt": "Pink fragments and ribbons gathering into a bright hemispherical burst.",
    "description": "Rose-colored fragments sweep through the air with thin trailing ribbons before a bright dome-shaped flash resolves the sequence.",
    "tags": [
      "Fragment motion",
      "Ribbon trails",
      "Burst"
    ],
    "duration": "0:05",
    "credit": "Whisp VFX studio",
    "audio": "Silent reel"
  },
  "ember-beam": {
    "title": "Ember Beam",
    "category": "Elemental / Unreal Engine",
    "realm": "crimson",
    "image": "assets/reels/ember-beam.webp",
    "video": "assets/reels/ember-beam.mp4",
    "alt": "An orange energy beam connecting a fiery ring to a bright impact.",
    "description": "A fiery ring channels a narrow orange beam across the test ground. The endpoint blooms into a bright, concentrated impact.",
    "tags": [
      "Fire ring",
      "Beam",
      "Impact"
    ],
    "duration": "0:10",
    "credit": "Whisp VFX studio",
    "audio": "Silent reel"
  },
  "surface-impact": {
    "title": "Surface Impact",
    "category": "Elemental / Unreal Engine",
    "realm": "crimson",
    "image": "assets/reels/surface-impact.webp",
    "video": "assets/reels/surface-impact.mp4",
    "alt": "A bright beam striking a stone sphere with sparks and debris.",
    "description": "A focused beam tracks across a stone sphere. A bright contact point, sparks, and scattering debris make the surface interaction visible throughout the capture.",
    "tags": [
      "Surface contact",
      "Sparks",
      "Debris"
    ],
    "duration": "0:35",
    "credit": "Whisp VFX studio",
    "audio": "Silent reel"
  }
};
const projectDialog = document.getElementById('project-dialog');
const dialogReturnFocus = new WeakMap();
let currentProject = 'scarlet-ascension';
const projectOrder = Object.keys(projects);
function openDialog(dialog, trigger = document.activeElement) { dialogReturnFocus.set(dialog, trigger); dialog.showModal(); }
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { const trigger = dialogReturnFocus.get(dialog); dialogReturnFocus.delete(dialog); if (trigger?.isConnected) trigger.focus({ preventScroll: true }); });
});
const projectVideo = document.getElementById('project-detail-video');
const playButton = document.getElementById('project-play');
const mediaStatus = document.getElementById('project-media-status');
function resetProjectMedia() {
  projectVideo.pause();
  if (projectVideo.readyState) projectVideo.currentTime = 0;
  projectVideo.removeAttribute('src');
  projectVideo.load();
  playButton.hidden = true;
}
projectDialog.addEventListener('close', resetProjectMedia);
projectVideo.addEventListener('play', () => { playButton.hidden = true; mediaStatus.textContent = ''; });
projectVideo.addEventListener('ended', () => { playButton.hidden = false; });
projectVideo.addEventListener('error', () => {
  if (!projectVideo.hasAttribute('src')) return;
  playButton.hidden = true;
  mediaStatus.textContent = 'This reel could not load. Use Open reel below to try it directly.';
});
playButton.addEventListener('click', () => {
  if (projectVideo.ended) projectVideo.currentTime = 0;
  projectVideo.play().catch(() => { mediaStatus.textContent = 'Use the video controls or Open reel below to start playback.'; });
});
document.addEventListener('visibilitychange', () => { if (document.hidden) projectVideo.pause(); });
window.addEventListener('pagehide', () => projectVideo.pause());

function displayProject(key) {
  const project = projects[key];
  if (!project) return;
  currentProject = key;
  projectDialog.dataset.realm = project.realm;
  resetProjectMedia();
  document.getElementById('project-title').textContent = project.title;
  document.getElementById('project-category').textContent = project.category;
  document.getElementById('project-description').textContent = project.description;
  const img = document.getElementById('project-detail-image');
  img.hidden = Boolean(project.video);
  img.src = project.image; img.alt = project.alt;
  projectVideo.hidden = !project.video;
  playButton.hidden = !project.video;
  mediaStatus.textContent = '';
  if (project.video) {
    projectVideo.poster = project.image;
    projectVideo.setAttribute('aria-label', `${project.title} — ${project.audio.toLowerCase()}`);
    projectVideo.src = project.video;
    projectVideo.load();
  }
  document.getElementById('project-credit').textContent = `${project.credit} · Unreal Engine · ${project.duration} · ${project.audio} · Original speed`;
  const reelLink = document.getElementById('project-reel-link');
  reelLink.hidden = !project.video;
  reelLink.href = project.video || project.image;
  document.getElementById('project-tags').replaceChildren(...project.tags.map(text => { const span = document.createElement('span'); span.textContent = text; return span; }));
  document.getElementById('project-position').textContent = `${projectOrder.indexOf(key) + 1} / ${projectOrder.length}`;
}
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  displayProject(button.dataset.project);
  openDialog(projectDialog, button);
}));
document.getElementById('previous-project').addEventListener('click', () => displayProject(projectOrder[(projectOrder.indexOf(currentProject) + projectOrder.length - 1) % projectOrder.length]));
document.getElementById('next-project').addEventListener('click', () => displayProject(projectOrder[(projectOrder.indexOf(currentProject) + 1) % projectOrder.length]));

document.addEventListener('keydown', event => {
  if (!projectDialog.open || event.target.closest('video, input, textarea, select')) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    const step = event.key === 'ArrowRight' ? 1 : -1;
    displayProject(projectOrder[(projectOrder.indexOf(currentProject) + step + projectOrder.length) % projectOrder.length]);
  }
});
document.getElementById('project-inquire').addEventListener('click', () => { dialogReturnFocus.delete(projectDialog); projectDialog.close(); });
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(filter => { const active = filter === button; filter.classList.toggle('active', active); filter.setAttribute('aria-pressed', String(active)); });
  const selected = button.dataset.filter === 'featured';
  let count = 0;
  document.querySelectorAll('#gallery .project').forEach(project => {
    project.hidden = selected ? project.dataset.featured !== 'true' : button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
    if (!project.hidden) count++;
  });
  const gallery = document.getElementById('gallery');
  gallery.classList.toggle('is-curated', selected);
  gallery.classList.toggle('is-filtered', !selected);
  document.getElementById('collection-footer').hidden = button.dataset.filter === 'all';
  document.getElementById('project-count').textContent = `${count} ${selected ? 'selected ' : ''}${count === 1 ? 'reel' : 'reels'}`;
  document.getElementById('gallery-top').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
}));
document.getElementById('show-all-projects').addEventListener('click', () => {
  const all = document.querySelector('[data-filter="all"]');
  all.click();
  all.focus({ preventScroll: true });
});

const realmNames = { veil: 'The veil', soul: 'The soul', crimson: 'The ember' };
const realmProjects = { veil: 'celestial-orbit', soul: 'spectral-serpent', crimson: 'scarlet-ascension' };
const realmArt = { veil: 'Concept atmosphere: a silver spirit in a ruined cathedral', soul: 'Concept atmosphere: spectral energy around an obsidian core', crimson: 'Concept atmosphere: a crimson arch above dark stone' };
document.querySelectorAll('[data-realm]').forEach(button => button.addEventListener('click', () => {
  const realm = button.dataset.realm;
  if (!realmProjects[realm]) return;
  document.body.dataset.realm = realm;
  document.querySelector('.hero').dataset.currentRealm = realm;
  document.querySelector('.hero-art').setAttribute('aria-label', realmArt[realm]);
  document.querySelectorAll('.realm-choice').forEach(choice => { const selected = choice === button; choice.classList.toggle('active', selected); choice.setAttribute('aria-pressed', String(selected)); });
  document.querySelectorAll('[data-scene]').forEach(scene => scene.classList.toggle('active', scene.dataset.scene === realm));
  document.querySelector('.realm-open').dataset.project = realmProjects[realm];
  document.getElementById('realm-status').textContent = `${realmNames[realm]} atmosphere selected.`;
  window.dispatchEvent(new CustomEvent('whisp:realm-change', { detail: { realm } }));
}));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); menuButton.focus(); } });

const rawContact = window.WHISP_CONTACT || {};
const contact = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawContact.email || '') ? rawContact.email : '',
  whatsapp: /^\d{7,15}$/.test(rawContact.whatsapp || '') ? rawContact.whatsapp : '',
  artstation: /^https:\/\/(?:[a-z0-9-]+\.)?artstation\.com\//i.test(rawContact.artstation || '') ? rawContact.artstation : ''
};
const contactDialog = document.getElementById('contact-dialog');
document.querySelectorAll('[data-contact]').forEach(link => {
  const method = link.dataset.contact;
  if (contact[method]) {
    link.hidden = false;
    link.href = method === 'email' ? `mailto:${contact.email}` : method === 'whatsapp' ? `https://wa.me/${contact.whatsapp}` : contact.artstation;
    link.querySelector('small').textContent = method === 'email' ? contact.email : method === 'whatsapp' ? '+91 99713 55102' : 'Explore our portfolio';
    if (method !== 'email') { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  } else { link.addEventListener('click', event => { event.preventDefault(); openDialog(contactDialog, link); }); }
});
document.getElementById('prepare-brief').addEventListener('click', () => { dialogReturnFocus.delete(contactDialog); contactDialog.close(); document.getElementById('inquiry-form').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' }); document.querySelector('[name="name"]').focus({ preventScroll: true }); });
const inquiryForm = document.getElementById('inquiry-form');
function updateContactChannel() {
  const emailSelected = inquiryForm.elements.channel.value === 'email';
  const emailInput = inquiryForm.elements.email;
  document.getElementById('email-field').hidden = !emailSelected;
  emailInput.disabled = !emailSelected;
  emailInput.required = emailSelected;
  document.getElementById('prepare-label').textContent = emailSelected ? 'Prepare email brief' : 'Prepare WhatsApp message';
  document.getElementById('form-note').textContent = emailSelected
    ? (contact.email ? 'Review your brief before opening email. You choose when to send.' : 'Our studio email is coming soon. Prepare a brief to copy or save.')
    : 'Review your brief before opening WhatsApp. You choose when to send.';
}
inquiryForm.querySelectorAll('[name="channel"]').forEach(input => input.addEventListener('change', updateContactChannel));
updateContactChannel();
const messageDialog = document.getElementById('message-dialog');
document.getElementById('inquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get('name')).trim();
  const message = String(data.get('message')).trim();
  if (!name || message.length < 10) { const field = !name ? form.elements.name : form.elements.message; field.setCustomValidity(!name ? 'Please enter your name.' : 'Please share at least 10 characters about your project.'); field.reportValidity(); field.addEventListener('input', () => field.setCustomValidity(''), { once: true }); return; }
  const email = String(data.get('email') || '').trim();
  const emailLine = email ? `\nEmail: ${email}` : '';
  const text = `Hi Whisp VFX studio,\n\nI'm ${name}.${emailLine}\nProject: ${data.get('project')}\n\n${message}\n\nLooking forward to creating something together.`;
  document.getElementById('message-preview').value = text;
  document.getElementById('copy-status').textContent = '';
  const channel = data.get('channel');
  const send = document.getElementById('send-message');
  send.hidden = !contact[channel];
  document.getElementById('copy-message').classList.toggle('button-light', !contact[channel]);
  if (contact[channel]) {
    send.textContent = channel === 'email' ? 'Open email' : 'Open WhatsApp';
    send.href = channel === 'email' ? `mailto:${contact.email}?subject=${encodeURIComponent(`Project inquiry — ${data.get('project')}`)}&body=${encodeURIComponent(text)}` : `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
    send.target = '_blank'; send.rel = 'noopener noreferrer';
    document.getElementById('message-explanation').textContent = 'Review your brief, then open your messaging app to send it. Nothing has been sent yet.';
  } else document.getElementById('message-explanation').textContent = `${channel === 'email' ? 'Email' : 'WhatsApp'} contact details are coming soon. Copy or save your brief below. Nothing has been sent.`;
  openDialog(messageDialog, form.querySelector('button[type="submit"]'));
});
document.getElementById('copy-message').addEventListener('click', async () => {
  const preview = document.getElementById('message-preview');
  try { await navigator.clipboard.writeText(preview.value); document.getElementById('copy-status').textContent = 'Message copied. It’s ready to paste.'; }
  catch { preview.focus(); preview.select(); document.getElementById('copy-status').textContent = 'Copy is unavailable in this browser. Your message is selected; use your device’s Copy command.'; }
});
document.getElementById('save-message').addEventListener('click', () => {
  const blob = new Blob([document.getElementById('message-preview').value], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'WhispVFX-project-brief.txt'; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); document.getElementById('copy-status').textContent = 'Your brief is ready to save.';
});
