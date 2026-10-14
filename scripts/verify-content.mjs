import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const app = readFileSync(resolve(root, 'dist/app.js'), 'utf8');
const html = readFileSync(resolve(root, 'dist/index.html'), 'utf8');
const data = app.slice(app.indexOf('const projects = '), app.indexOf('const projectDialog'));
const projects = vm.runInNewContext(`${data}\nprojects`);
const cards = [...html.matchAll(/class="project(?: project-wide)?"[^>]*data-project="([^"]+)"[^>]*data-category="([^"]+)"/g)];
assert.equal(cards.length, Object.keys(projects).length, 'Every project needs exactly one gallery card');
assert.equal(new Set(cards.map(m => m[1])).size, cards.length, 'Gallery IDs must be unique');
const assets = new Set();
let videoBytes = 0;
for (const [id, project] of Object.entries(projects)) {
  assert(cards.some(m => m[1] === id), `Missing card: ${id}`);
  assert(project.title && project.alt && project.description && project.credit, `Incomplete content: ${id}`);
  assert.equal(project.credit, 'Whisp VFX studio');
  for (const path of [project.video, project.image, project.image.replace('.webp', '-thumb.webp')]) {
    assert(path.startsWith('assets/reels/') && !path.includes('..'), `Unexpected media path: ${path}`);
    const file = resolve(root, 'dist', path);
    assert(existsSync(file) && statSync(file).size > 0, `Missing/empty media: ${path}`);
    assets.add(path);
    if (path.endsWith('.mp4')) {
      const bytes = statSync(file).size;
      assert(bytes < 25_000_000, `Reel needs further optimization: ${id}`);
      videoBytes += bytes;
      const contents = readFileSync(file);
      assert(contents.indexOf(Buffer.from('moov')) < contents.indexOf(Buffer.from('mdat')), `Reel needs fast-start metadata: ${id}`);
    }
  }
}
const mapping = app.match(/const realmProjects = (\{[^;]+\});/)[1];
const realms = vm.runInNewContext(`(${mapping})`);
for (const id of Object.values(realms)) assert(projects[id], `Hero links to missing project: ${id}`);
for (const src of html.matchAll(/(?:src|href)="((?:assets\/)[^"]+)"/g)) assert(existsSync(resolve(root, 'dist', src[1])), `Broken HTML asset: ${src[1]}`);
assert(!html.includes('Explore study') && !html.includes('3 studies'), 'Sample gallery wording remains');
assert(videoBytes < 100_000_000, 'Media bundle is too large');
console.log(`${cards.length} projects, ${assets.size} media assets, valid hero mappings, fast-start MP4s; ${(videoBytes / 1e6).toFixed(2)} MB of video.`);
