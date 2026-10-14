# WhispVFX agent instructions

Read `CONTENT_HANDOFF.md` before updating portfolio content.

- This is the existing WhispVFX website: plain HTML, CSS, and JavaScript in `dist/`. Preserve its immersive dark fantasy design unless the user requests a redesign.
- Hosting is explicitly Vercel at `https://whispvfx.vercel.app/`, project `whispvfx`, scope `aayushs-projects-4c65c2a5`. Update that project; avoid creating a duplicate hosting project or publishing to the earlier Sites host.
- The three hero atmosphere images are AI-generated concept illustrations, labeled as such. The gallery contains 15 user-approved Unreal Engine reels, credited to **Whisp VFX studio**. The studio also creates VFX for Unity. Describe only supplied actual renders/reels as studio VFX work. Use accurate project titles and credits; ask the user when needed.
- Import optimized copies of the user's selected media. Preserve original captures, Unreal projects, and source assets on the content PC.
- The viewer supports images and on-demand MP4 video playback. Preserve native controls, inline mobile playback, the explicit play button, direct-reel fallback, and pause/reset/unload behavior on dialog close and project change. Reels are silent and run at their original speed.
- Gallery previews live in `dist/assets/previews/`, controlled by `dist/previews.js`. Preserve lazy loading, a maximum of two visible playing clips, poster fallback, the pause toggle, and reduced-motion/data-saving behavior. Previews pause when a dialog opens or a card is hidden.
- Contact destinations are in `dist/studio-config.js`; fill them only from user-supplied information. Keep the inquiry form truthful about preparing a message.
- WhatsApp is the default contact channel. The supplied number is 9971355102, configured with India's +91 country code. Email remains an optional channel; no studio email address has been supplied. Require the visitor's email only when that channel is selected.
- Keep credentials, `.vercel/`, `.openai/`, `.env*`, incoming media, and raw project files out of Git. Authenticate through the supported GitHub/Vercel sign-in flow when needed.
- Run appropriate syntax checks, inspect the actual desktop/mobile rendering, and verify the live URL after publishing. Do not claim publication or video playback without evidence.
