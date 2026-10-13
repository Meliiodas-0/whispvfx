# WhispVFX

A static, responsive dark fantasy studio portfolio. Serve `dist` with any static server.

Live website: **https://whispvfx.vercel.app/**

Source repository: **https://github.com/Meliiodas-0/whispvfx**

For ChatGPT or Codex on the content PC, start with [CONTENT_HANDOFF.md](CONTENT_HANDOFF.md). It maps the content files, explains adding real VFX reels, and gives deployment steps for the existing Vercel project.

## Contact destinations

Set the real ArtStation URL, email address, and international WhatsApp number in `dist/studio-config.js`. Empty values show a truthful coming-soon state. The inquiry form validates and prepares a message; it never claims to send one. When configured, it opens a mailto or WhatsApp draft for the visitor to send.

## Portfolio

The three original AI-generated concept illustrations are sample visual directions, not supplied studio work or rendered Unreal projects. Replace them with WhispVFX's actual images and reels, then update the project descriptions in `dist/app.js` and gallery text in `dist/index.html`.

## Implementation

Plain HTML, CSS and JavaScript. Native accessible dialogs and disclosure elements. No analytics, form backend, or persisted personal information. The two fonts load from Google Fonts with system fallbacks. Reduced motion preferences are respected. Original full-resolution artwork is retained outside this checkout in `vfx-art-assets`.

The immersive layer lives in `dist/immersive.css` and `dist/atmosphere.js`. Three realm buttons change the hero art and particle palette. Motion can be paused, respects reduced-motion preferences, and stops when the hero is offscreen. Ambient Web Audio starts only after the visitor turns it on and turns off when the page is hidden. Project dialogs include previous/next navigation.

Public hosting is on Vercel. The output directory is `dist`; no install or build step is required. Link a new checkout to the existing `whispvfx` project before deploying; see the handoff guide. `.vercel` and the earlier `.openai` Sites identity stay local and are ignored.
