# WhispVFX

A static, responsive dark fantasy studio portfolio. Serve `dist` with any static server.

Live website: **https://whispvfx.vercel.app/**

Source repository: **https://github.com/Meliiodas-0/whispvfx**

For ChatGPT or Codex on the content PC, start with [CONTENT_HANDOFF.md](CONTENT_HANDOFF.md). It maps the content files, explains adding real VFX reels, and gives deployment steps for the existing Vercel project.

## Contact destinations

Set the real ArtStation URL, email address, and international WhatsApp number in `dist/studio-config.js`. Empty values show a truthful coming-soon state. The inquiry form validates and prepares a message; it never claims to send one. When configured, it opens a mailto or WhatsApp draft for the visitor to send.

WhatsApp is the default channel, using the artist-supplied number with India's +91 country code. Visitors can switch to email; the email field is only enabled and required for that channel. The studio email address has not been supplied, so email briefs can be copied or saved until it is configured. Unconfigured direct contact links stay hidden.

## Portfolio

The gallery contains 15 actual Unreal Engine VFX reels approved by the artist, credited to **Whisp VFX studio**. The studio creates effects for Unreal Engine and Unity; the currently supplied renders are all from Unreal Engine. Descriptive project titles were chosen from the filenames and visible effects with the artist's approval.

Optimized H.264 MP4s, WebP posters, and smaller gallery thumbnails live in `dist/assets/reels/`. Videos total about 32.84 MB versus 138.79 MB of original captures. Original speed, frame rate, duration, and framing are preserved; width is capped at 1600 pixels without upscaling. The supplied audio tracks contain silence. Video metadata loads only when a project opens, and closing or changing projects pauses, resets, and unloads playback. The three original AI concept illustrations remain only as labeled atmospheric hero backgrounds.

Gallery cards also contain silent previews in `dist/assets/previews/` (6.44 MB total). They are short excerpts at original speed and 30 fps, up to 1280 pixels wide for the lead piece, 1000 pixels for its companion pieces, and 800 pixels for the smaller works. At most two visible cards play; previews pause when offscreen, filtered out, in the background, or covered by a dialog. The preview toggle, reduced-motion preference, and data-saving preference keep posters available without autoplay. Generate all loops with `python scripts/make-previews.py`, or name an effect to regenerate only that loop; the helper requires `imageio-ffmpeg` and reads only optimized web reels.

All 15 reels are visible from the start. All work is the default filter; category filters narrow the collection. There is no selected-six view or expand-all step. The project viewer navigates all 15 pieces.

## Implementation

Plain HTML, CSS and JavaScript. Native accessible dialogs and disclosure elements. No analytics, form backend, or persisted personal information. The two fonts load from Google Fonts with system fallbacks. Reduced motion preferences are respected. Original full-resolution artwork is retained outside this checkout in `vfx-art-assets`.

The immersive layer lives in `dist/immersive.css` and `dist/atmosphere.js`. Three realm buttons change the hero art and particle palette, with links to actual reels. Motion can be paused, respects reduced-motion preferences, and stops when the hero is offscreen. Ambient Web Audio starts only after the visitor turns it on and turns off when the page is hidden. Project dialogs include previous/next and arrow-key navigation, Escape and backdrop dismissal, and focus restoration.

The theme lives in `dist/overgrowth.css`: organic reel portals, charcoal shadows, and ember accents. `dist/vines.js` draws foreground SVG roots at the viewport edges. Subtle light follows the roots as visitors scroll; there is no vine photograph or background texture. Motion controls, reduced-motion preferences, and open dialogs govern the effect. Read `DESIGN_NOTES.md` for implementation details.

Run `node --check dist/app.js`, `node --check dist/atmosphere.js`, `node --check dist/previews.js`, and `node scripts/verify-content.mjs` before publishing. Browser verification must include real video/preview playback, the WhatsApp draft destination, the email toggle, and both desktop and mobile widths.

Public hosting is on Vercel. This GitHub repository is connected to the existing `whispvfx` project, with `main` as its production branch. Pushing updates to `main` triggers Vercel deployment. The output directory is `dist`; no install or build step is required. For direct CLI deployment, link a new checkout to the existing project first; see the handoff guide. `.vercel` and the earlier `.openai` Sites identity stay local and are ignored.
