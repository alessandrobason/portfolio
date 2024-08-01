---
layout: project-page.njk
title: "Beyond Triangles: Sculpting with SDF RayMarching"
width: 2
dir: "sdf"
colour: [ 114, 72, 81 ]
image: "main.jpg"

background: "images/9.jpg"
source: "https://github.com/alessandrobason/cmp400_honours"
download: "https://snarmph.itch.io/beyond-triangles"
---

The Beyond Triangles application is a user-friendly program that enables non-technical users to create and modify complex 3D sculptures using signed distance fields and rendering them with ray marching.

<iframe class="youtube" src="https://www.youtube.com/embed/vghROmh8yPE?si=SUBRYKw0XJUOu0m3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


Features:

* Auto saving.
* Key remapping.
* Render using ray tracing.
* Brush Editor
  * Swap between the brush and eraser using the icons.
  * Modify how the brush behaves by changing its scale, depth, blend amount, and even its shape.
  * Brushes can be loaded from a file, this file can even be a sculpture you previously exported, so for instance you could create a tree and then use it to populate a forest.
* Material Editor
  * Change the way the sculpture is rendered by changing its colour, reflection colour, emissive colour, smoothness, shininess, and texture.
  * Change the environment by changing the background image (the renderer will adapt to make it look like the sculpture is inside the environment).
  * Add or remove any amount of lights, these can have any colour, size, strength, and position. The final render will adapt to all these lights!
  * If you're using high dynamic range (HDR) images, you can turn on tonemapping to normalise the final render.
* Render Editor
  * Change how the final image is rendered by changing the number of times the light is allowed to bounce..
  * Make the render faster or slower by changing the amount of rays that are shot for each pixels, an higher number will render in less frames but each frame will take longer!
  * Change how blurry the image is by using the "Blurriness" slider.
  * Don't forget to press "Save image" when the render is satisfactory, the image will be saved in the "screenshots" folder as ray_tracing_render_xyz.png.
* File Menu
  * Create a new canvas with the "New" option, you can also have a default shape in it to start editing.
  * Save the current sculpture using the "Save" option, you can save at any resolution and the sculpture will be scaled accordingly.
  * Load a sculpture to edit it further.
* Options
  * VSync
  * Change resolution
  * Auto save time
  * Change sensitivity

Controls:

* Exit program: Escape
* Take screenshot: P
* Capture frame (debugging only): F
* Rotate camera: Right mouse button / Arrow keys
* Reset zoom: Z
* Zoom in: Mouse wheel / X
* Zoom out: Mouse wheel / C
* Use brush: Q
* Use eraser: E
* While editing:
  * Modify scale: Shift
  * Modify depth: Ctrl
  * Modify blend: Alt
* New canvas: Ctrl + A
* Save sculpture: Ctrl + S