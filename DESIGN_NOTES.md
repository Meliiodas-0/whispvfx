# Foreground vines — October 14, 2026

The artist rejected the earlier vine-image backdrop and asked for on-screen vines with a small glowing effect moving through them as the page scrolls. The decorative image was removed from the served site.

`dist/vines.js` draws layered SVG root paths in a transparent, fixed foreground layer. Intertwined trunks, tapering twigs, fine fibres, a bark gradient, and restrained procedural displacement give the geometry an organic surface. Glowing segments use normalized path lengths and a soft halo. Scroll position changes their dash offset, so light travels along actual vine geometry instead of moving a background image.

The layer cannot intercept input. It sits along the viewport edges, scales down on phones, and hides when dialogs open. It has no continuous animation loop: scroll, resize, motion, and visibility changes request one animation frame. The existing motion toggle and reduced-motion preference disable travel. No image-generation asset is used for the vines.

All 15 effects appear immediately. The selected-six view, initially hidden projects, and expand-all footer are removed. Category filtering and the all-work reset remain. Gallery previews retain lazy loading and a maximum of two simultaneous clips. Portal crops are decorative previews; the full viewer preserves source framing.
