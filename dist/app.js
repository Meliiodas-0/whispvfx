const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-header nav');
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); nav.classList.toggle('open', open); });
nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); } });
document.getElementById('year').textContent = new Date().getFullYear();

const projects = {
  soul: { title: 'The soul within', category: 'Soul & magic / Visual development', image: 'assets/soul.webp', alt: 'Silver soul energy orbiting a suspended fragment of obsidian', description: 'A study in restrained power. Fine spectral strands orbit a fractured core, gathering into a luminous, weightless presence. The direction balances a readable central silhouette with delicate motion at its edges.', tags: ['Spectral energy', 'Orbital motion', 'Cold luminescence'] },
  crimson: { title: 'A crimson awakening', category: 'Elemental / Visual development', image: 'assets/crimson.webp', alt: 'A crimson flame arch rising above weathered stone steps', description: 'Heat against cold stone. An eruption of crimson light spills into a forgotten sanctuary, tracing an arch in the darkness. The direction explores force, sharp anticipation, and the slower rhythm of dying embers.', tags: ['Ember trails', 'Volumetric fire', 'High contrast'] },
  veil: { title: 'Beyond the veil', category: 'Atmosphere / Visual development', image: 'assets/hero.webp', alt: 'A silver spirit moving through a dark ruined cathedral', description: 'A world caught between absence and presence. A spectral veil drifts through ruined architecture, leaving only light in its wake. This atmospheric direction uses scale, negative space, and a restrained palette to make the impossible feel close.', tags: ['Spectral atmosphere', 'Environmental storytelling', 'Silver & shadow'] }
};
const projectDialog = document.getElementById('project-dialog');
const dialogReturnFocus = new WeakMap();
let currentProject = 'veil';
const projectOrder = ['veil', 'soul', 'crimson'];
function openDialog(dialog, trigger = document.activeElement) { dialogReturnFocus.set(dialog, trigger); dialog.showModal(); }
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { const trigger = dialogReturnFocus.get(dialog); dialogReturnFocus.delete(dialog); if (trigger?.isConnected) trigger.focus({ preventScroll: true }); });
});
function displayProject(key) {
  const project = projects[key];
  if (!project) return;
  currentProject = key;
  projectDialog.dataset.realm = key;
  document.getElementById('project-title').textContent = project.title;
  document.getElementById('project-category').textContent = project.category;
  document.getElementById('project-description').textContent = project.description;
  const img = document.getElementById('project-detail-image'); img.src = project.image; img.alt = project.alt;
  document.getElementById('project-tags').replaceChildren(...project.tags.map(text => { const span = document.createElement('span'); span.textContent = text; return span; }));
  document.getElementById('project-position').textContent = `${projectOrder.indexOf(key) + 1} / ${projectOrder.length}`;
}
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  displayProject(button.dataset.project);
  openDialog(projectDialog, button);
}));
document.getElementById('previous-project').addEventListener('click', () => displayProject(projectOrder[(projectOrder.indexOf(currentProject) + projectOrder.length - 1) % projectOrder.length]));
document.getElementById('next-project').addEventListener('click', () => displayProject(projectOrder[(projectOrder.indexOf(currentProject) + 1) % projectOrder.length]));
document.getElementById('project-inquire').addEventListener('click', () => { dialogReturnFocus.delete(projectDialog); projectDialog.close(); });
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(filter => { const active = filter === button; filter.classList.toggle('active', active); filter.setAttribute('aria-pressed', String(active)); });
  let count = 0;
  document.querySelectorAll('.project').forEach(project => { project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter; if (!project.hidden) count++; });
  document.getElementById('gallery').classList.toggle('is-filtered', button.dataset.filter !== 'all');
  document.getElementById('project-count').textContent = `${count} ${count === 1 ? 'study' : 'studies'}`;
}));

const realmNames = { veil: 'The veil', soul: 'The soul', crimson: 'The ember' };
document.querySelectorAll('[data-realm]').forEach(button => button.addEventListener('click', () => {
  const realm = button.dataset.realm;
  if (!projects[realm]) return;
  document.body.dataset.realm = realm;
  document.querySelector('.hero').dataset.currentRealm = realm;
  document.querySelector('.hero-art').setAttribute('aria-label', projects[realm].alt);
  document.querySelectorAll('.realm-choice').forEach(choice => { const selected = choice === button; choice.classList.toggle('active', selected); choice.setAttribute('aria-pressed', String(selected)); });
  document.querySelectorAll('[data-scene]').forEach(scene => scene.classList.toggle('active', scene.dataset.scene === realm));
  document.querySelector('.realm-open').dataset.project = realm;
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
    link.href = method === 'email' ? `mailto:${contact.email}` : method === 'whatsapp' ? `https://wa.me/${contact.whatsapp}` : contact.artstation;
    link.querySelector('small').textContent = method === 'email' ? contact.email : method === 'whatsapp' ? 'Start a direct message' : 'Explore our portfolio';
    if (method !== 'email') { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  } else { link.addEventListener('click', event => { event.preventDefault(); openDialog(contactDialog, link); }); }
});
document.getElementById('prepare-brief').addEventListener('click', () => { dialogReturnFocus.delete(contactDialog); contactDialog.close(); document.getElementById('inquiry-form').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' }); document.querySelector('[name="name"]').focus({ preventScroll: true }); });
if (contact.email || contact.whatsapp) document.getElementById('form-note').textContent = 'Review your brief, then open your chosen app. Nothing is sent automatically.';
const messageDialog = document.getElementById('message-dialog');
document.getElementById('inquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get('name')).trim();
  const message = String(data.get('message')).trim();
  if (!name || message.length < 10) { const field = !name ? form.elements.name : form.elements.message; field.setCustomValidity(!name ? 'Please enter your name.' : 'Please share at least 10 characters about your project.'); field.reportValidity(); field.addEventListener('input', () => field.setCustomValidity(''), { once: true }); return; }
  const text = `Hi WhispVFX,\n\nI'm ${name}.\nEmail: ${String(data.get('email')).trim()}\nProject: ${data.get('project')}\n\n${message}\n\nLooking forward to creating something together.`;
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
