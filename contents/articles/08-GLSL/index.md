---
title: GLSL Shaders
tags: tag, another tag
excerpt: Made in GLSL
date: 01/01/2012
template: article.jade
---
![image1.jpg](image1.jpg)
The graphics were created using the Graphics Shader Library GLSL. It was a mathematical exploration visuallized using code for graphics without the use of post-processing.

GLSL is a relatively low-level computer language, hence all the code needs to be written from scratch to define functions like _random_ and _noise_. The final generated image is an amalgamation of multiple mathematical equations that essentially manipulate the color of the pixels.
<div class=".row">
<div class="col m6">
[![paint.gif](paint.gif)](http://jaskirat.me/uploads/shaders/final/Threejs_Point_add/)
</div>
<div class="col m6">
[![fireball1.gif](fireball1.gif)](http://jaskirat.me/uploads/shaders/midterm/)
</div>
</div>

<div class="glsl_editor" data="light1.frag"></div>
<div class="glsl_editor" data="sun1.frag"></div>
<div class="glsl_editor" data="sun2.frag"></div>
<div class="glsl_editor" data="bw1.frag"></div>
<div class="glsl_editor" data="bw2.frag"></div>
<div class="glsl_editor" data="bw3.frag"></div>
<div class="glsl_editor" data="bw4.frag"></div>
<div class="glsl_editor" data="bw6.frag"></div>
<div class="glsl_editor" data="noise_color1.frag"></div>
<div class="glsl_editor" data="noise_color2.frag"></div>
<div class="glsl_editor" data="noise_color3.frag"></div>
<div class="glsl_editor" data="wobbly.frag"></div>
<div class="glsl_editor" data="matrix.frag"></div>
<div class="glsl_editor" data="matrix2.frag"></div>



Gradients can be generated by shaping functions. My artistic goal was to create realistic animations to mimic the interplay of light and shadow. GLSL is the basis of anywhere advanced graphics are used in computer applications. Unlike other advanced parametric tools with sophisticated GUI like that of Grasshopper and Houdini, GLSL runs on a single file of written code. The images shown are two-dimensional stand-alone pieces of work which can vary from simple geometries to highly complex patterns. Technically, these are known as fragment shaders.



Shaders helped me fundamentally understand the space time relationships in form of colors. By comprehending shaping functions in a 2D geometry, they can be applied to transform shapes in 3D space. Those shaders are typically refered to as vertex shaders.

Check out the repository here on [Github](https://github.com/jaskiratr/randj063_ss2015)