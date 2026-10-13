# Content PC handoff

## Goal

Replace the sample visual studies with WhispVFX's actual Unreal VFX renders, screenshots, and reels while retaining the existing immersive design. Commit and push the result, then publish to the existing public website at **https://whispvfx.vercel.app/**.

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
| `dist/assets/` | Optimized media served by the website. The current `hero.webp`, `soul.webp`, and `crimson.webp` are AI-generated illustrations. |
| `dist/app.js` | `projects` object: IDs, titles, categories, images, alt text, descriptions, and tags. `projectOrder` controls viewer navigation. |
| `dist/index.html` | Gallery cards, filters/counts, hero realm choices, and project-dialog markup. `data-project` IDs must match the project object. |
| `dist/immersive.css` | Realm backgrounds and swatches; asymmetric gallery layout. Some selectors specifically target the `crimson` ID. |
| `dist/atmosphere.js` | Particles, motion controls, and optional ambient sound. Preserve this behavior during content changes. |
| `dist/studio-config.js` | Real ArtStation URL, email, and digits-only WhatsApp number including country code. |
| `vercel.json` | Buildless static hosting, output directory `dist`. |

Update or remove sample wording such as "Selected visual studies", "Explore study", "Visual development", the study count, and the concept-art caption only when the associated content has actually been replaced. The hero realms may retain their atmospheric names while project cards use actual project titles. Keep all realm/project references consistent.

## Real images and reels

Copy and optimize media; preserve originals. Use useful posters/thumbnails and descriptive alt text. Keep page downloads light. For large reels, use the user's approved video host or storage rather than adding large raw captures to Git. Check current provider limits before uploading.

**Video playback is not implemented in this snapshot.** The project viewer currently uses `<img id="project-detail-image">`. When adding reels, extend the project data with video/poster information and implement a corresponding `<video controls playsinline preload="metadata" poster="...">` in the viewer. Show the correct image or video for each project, pause and reset playback on close or project change, and check real playback plus audio on desktop and mobile. Do not imply that a still image is a playable reel. Keep keyboard focus, Escape, backdrop dismissal, and previous/next navigation working.

## Preview and checks

No dependency installation or build step is needed. With Python available:

```sh
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open `http://127.0.0.1:4173/`. Check the actual rendering at desktop and mobile widths, gallery filters, realm changes, project navigation, media playback, motion/sound controls, and contact drafts. Check for missing media, console errors, and horizontal overflow.

```sh
node --check dist/app.js
node --check dist/atmosphere.js
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
