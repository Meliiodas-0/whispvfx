# Content PC handoff

## Goal

Maintain WhispVFX's actual VFX renders and reels while retaining the existing immersive design. Commit and push updates, then verify the existing public website at **https://whispvfx.vercel.app/**.

## Current content — October 14, 2026

The artist approved publication of all 15 videos from their central VFX folder. Credit: **Whisp VFX studio**. They create VFX for Unreal Engine and Unity; every currently supplied video was rendered in Unreal Engine. Project titles are artist-approved descriptive names chosen from the visible effects and filenames. Do not invent clients, character/model credits, or additional production roles.

The gallery now contains playable reels with WebP posters and smaller thumbnails in `dist/assets/reels/`. The three concept illustrations remain as labeled hero/studio atmosphere backgrounds, not gallery work. Hero realm links map through `realmProjects` to actual reels. Gallery layout repeats asymmetric pairs and wide cards; filtered layouts support multiple results.

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
| `dist/immersive.css` | Realm backgrounds and swatches; repeating asymmetric gallery layout, filtered grids, and responsive video viewer. |
| `dist/atmosphere.js` | Particles, motion controls, and optional ambient sound. Preserve this behavior during content changes. |
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
