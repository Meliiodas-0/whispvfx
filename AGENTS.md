# WhispVFX agent instructions

Read `CONTENT_HANDOFF.md` before updating portfolio content.

- This is the existing WhispVFX website: plain HTML, CSS, and JavaScript in `dist/`. Preserve its immersive dark fantasy design unless the user requests a redesign.
- Hosting is explicitly Vercel at `https://whispvfx.vercel.app/`, project `whispvfx`, scope `aayushs-projects-4c65c2a5`. Update that project; avoid creating a duplicate hosting project or publishing to the earlier Sites host.
- The existing three images are AI-generated concept illustrations. Describe only supplied actual renders/reels as studio VFX work. Use accurate project titles and credits; ask the user when needed.
- Import optimized copies of the user's selected media. Preserve original captures, Unreal projects, and source assets on the content PC.
- The current viewer supports images. Implement and verify video playback when adding reels; pause/reset media on dialog close and project change.
- Contact destinations are in `dist/studio-config.js`; fill them only from user-supplied information. Keep the inquiry form truthful about preparing a message.
- Keep credentials, `.vercel/`, `.openai/`, `.env*`, incoming media, and raw project files out of Git. Authenticate through the supported GitHub/Vercel sign-in flow when needed.
- Run appropriate syntax checks, inspect the actual desktop/mobile rendering, and verify the live URL after publishing. Do not claim publication or video playback without evidence.
