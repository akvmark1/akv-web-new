---
name: WebGL preview fallback
description: Environment constraint for 3D scenes rendered in the Replit preview.
---

The Replit preview can fail to create a WebGL context even when the same Three.js scene works in a normal browser. 3D hero work should detect WebGL support before mounting the renderer and keep a meaningful 2D fallback visible.

**Why:** The previous hero renderer produced an empty visual and runtime errors in the preview when WebGL was unavailable.

**How to apply:** Preserve the fallback path when changing or replacing the Earth scene, and verify the initial preview without assuming GPU support.