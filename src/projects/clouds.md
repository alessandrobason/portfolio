---
layout: project-specific/clouds.njk
title: "Raymarched volumetric clouds"
width: 2
dir: "clouds"
colour: [ 134, 140, 255 ]
image: "main.jpg"
desc: "Volumetric clouds rendering on the GPU using ray marching"

source: "https://github.com/alessandrobason/clouds-scene"
download: "https://snarmph.itch.io/volumetric-clouds"
---

This project renders volumetric clouds inside a box volume, with a sun/moon using only ray marching.

The project is written in C and GLSL, using the [Sokol libraries](https://github.com/floooh/sokol) for graphics and windowing abstractions;

The project can be run as either a single application, or as a client/host model where the host dynamically loads the client, making iterating the shader much easier.

Thanks to Sokol GFX, the program can be built both for Windows and Wasm (potentially Linux and Mac too, but I don't have the means to test it). The background on this page is the shader running in real time.

The clouds density is obtained using fractal brownian motion on a noise texture. When calculating the fbm, the shader takes the distance from the camera in consideration, and avoids calculating the smaller details, which require a texture sample
The raymarcher returns early if it finds that the density has already reached its maximum value.

The sunflare is created by sampling the noise texture using the angle between the pixel's coordinate and the sun screen position.
The glare is also slightly offset using the time since the program start to give it an animated glowing effect.