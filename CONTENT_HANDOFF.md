# Content PC handoff

## Goal

Maintain WhispVFX's actual VFX renders and reels while retaining the existing immersive design. Commit and push updates, then verify the existing public website at **https://whispvfx.vercel.app/**.

## Current content — October 14, 2026

The artist approved publication of all 15 videos from their central VFX folder. Credit: **Whisp VFX studio**. They create VFX for Unreal Engine and Unity; every currently supplied video was rendered in Unreal Engine. Project titles are artist-approved descriptive names chosen from the visible effects and filenames. Do not invent clients, character/model credits, or additional production roles.

The gallery contains playable reels with WebP posters and smaller thumbnails in `dist/assets/reels/`. The three concept illustrations remain as labeled hero atmosphere backgrounds, not gallery work. Hero realm links map through `realmProjects` to actual reels. The hero is preserved; the lower sections are styled in `dist/curated.css` after an artist-requested aesthetic curation pass.

The default Selected filter presents six pieces: Scarlet Ascension as the lead, Spectral Serpent and Celestial Orbit as companion pieces, then Fourfold Frost, Arcane Convergence, and Violet Aegis. All 15 reels remain available through All work and category filters. The footer link expands the full collection. Filtering returns visitors to the gallery start. `data-featured` controls selection, and `projectOrder` still includes all 15 for viewer navigation. The studio folio uses an explicitly labeled detail from Crimson Hand Magic, with a button to the original full-frame reel.

Gallery cards also play silent short previews from `dist/assets/previews/`, with a separate toggle. `dist/previews.js` loads sources only as cards enter view, limits playback to two visible cards, and pauses on filtering, dialogs, page hiding, or preview-toggle changes. Reduced-motion and data-saving preferences default to posters. `scripts/make-previews.py` regenerates previews from optimized web reels without changing originals. The lead preview is 1280 pixels wide, companion previews are 1000 pixels, and smaller previews are 800 pixels, totaling 6.44 MB. Thumbnail crops are presentation details; full reels preserve their original framing.

WhatsApp is the default contact channel. The user supplied 9971355102, configured as `919971355102` with India's country code. The form does not request email on WhatsApp; selecting Email reveals and requires that field. No studio email address or ArtStation URL has been supplied. Email briefs remain copy/save drafts, and unconfigured direct contact links are hidden.

Web videos are H.264/yuv420p MP4 with fast-start metadata, capped at 1600 pixels wide without upscaling. Original framing, speed, frame rate, and duration are preserved. The supplied clips are silent, including captures with silent AAC tracks. Original captures and processing/QA files remain outside the repository; never replace the central final videos with these web copies.

Repository: **https://github.com/Meliiodas-0/whispvfx**. Default branch: `main`.

## Start on the content PC

Use a ChatGPT/Codex session that can access local files and development tools. Clone the repository into a new folder, or reuse its existing checkout without overwriting uncommitted work:

```sh
git clone https://github.com/Meliiodas-0/whispvfx.git
cd whispvfx
```

Read `AGENTS.md` and this guide. Ask the user for the folder containing the actual work if its location is unknown. Confirm which renders/reels can be published and gather missing titles, descriptions, roles, and credits. Contact details can be added when provided. Do not invent work, clients, metrics, or contact destinations.

## Files to update

| File | Purpose |
| --- | --- |
| `dist/assets/` | Optimized media served by the website. `reels/` contains actual work; `hero.webp`, `soul.webp`, and `crimson.webp` are labeled AI atmosphere illustrations. |
| `dist/app.js` | `projects` object: IDs, titles, categories, images, alt text, descriptions, and tags. `projectOrder` controls viewer navigation. |
| `dist/index.html` | Gallery cards, filters/counts, hero realm choices, and project-dialog markup. `data-project` IDs must match the project object. |
| `dist/immersive.css` | Hero realm backgrounds, swatches, atmosphere styling, and responsive video viewer. |
| `dist/curated.css` | The curated collection, filtered grids, warm studio folio, contact composition, and footer. Lower-page rules override the earlier styling without changing the hero. |
| `dist/atmosphere.js` | Particles, motion controls, and optional ambient sound. Preserve this behavior during content changes. |
| `dist/previews.js` | Lazy, silent card previews and their playback lifecycle. |
| `dist/studio-config.js` | Real ArtStation URL, email, and digits-only WhatsApp number including country code. |
| `vercel.json` | Buildless static hosting, output directory `dist`. |

Update or remove sample wording such as "Selected visual studies", "Explore study", "Visual development", the study count, and the concept-art caption only when the associated content has actually been replaced. The hero realms may retain their atmospheric names while project cards use actual project titles. Keep all realm/project references consistent.

## Real images and reels

Copy and optimize media; preserve originals. Use useful posters/thumbnails and descriptive alt text. Keep page downloads light. For large reels, use the user's approved video host or storage rather than adding large raw captures to Git. Check current provider limits before uploading.

**Video playback is implemented.** Project data includes `video` and `image` (poster) fields. The viewer uses `<video controls playsinline preload="metadata">` with an explicit play button and direct-reel fallback link. It attaches a source only on project open, then pauses, resets, and removes it on close or project change. Preserve this behavior and test real playback on desktop/mobile, including any audio supplied in future clips. Keep focus, Escape, backdrop dismissal, and previous/next navigation working.

## Preview and checks

No dependency installation or build step is needed. With Python available:

```sh
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open `http://127.0.0.1:4173/`. Check the actual rendering at desktop and mobile widths, gallery filters, realm changes, project navigation, media playback, motion/sound controls, and contact drafts. Check for missing media, console errors, and horizontal overflow.

```sh
node --check dist/app.js
node --check dist/atmosphere.js
node --check dist/previews.js
node scripts/verify-content.mjs
```

## GitHub and existing Vercel hosting

GitHub owner: `Meliiodas-0`. Push access requires sign-in to that account or an authorized collaborator. Never copy tokens between PCs or commit them.

Existing Vercel project:

- Name: `whispvfx`
- Scope: `aayushs-projects-4c65c2a5`
- Project ID: `prj_dZWYkh4FrwEhBw8YrBhuV8RaCY8E`
- Production URL: `https://whispvfx.vercel.app/`
- Framework: Other / static; root directory: repository root; output: `dist`; install and build commands: empty.

This repository was connected to the existing Vercel project on October 13, 2026, and `main` was verified as the production branch. Pushing `main` triggers deployment through Vercel. Check that the integration remains connected, then verify the resulting deployment rather than assuming it succeeded. See [Vercel Git integration](https://vercel.com/docs/cli/git).

For direct deployment from a new checkout, authenticate to the existing Vercel account when needed, then link the existing project:

```sh
npx --yes vercel@61.0.0 login
npx --yes vercel@61.0.0 link --yes --project whispvfx --scope aayushs-projects-4c65c2a5
npx --yes vercel@61.0.0 deploy --prod --yes --scope aayushs-projects-4c65c2a5
```

Skip login if already authenticated. Verify the linked project ID matches the one above before deploying. Keep `.vercel/` local. Preserve the user's request for a publicly accessible website with no sign-in lock. Do not create a new project if access is missing; finish the content locally and report the specific sign-in or access needed.

Commit the intended source/media changes with an author identity recognized by GitHub and push to `origin/main`. Verify the production URL without authenticated cookies and check the actual updated media. Report the commit and live URL, plus any contact or publishing details still missing.
