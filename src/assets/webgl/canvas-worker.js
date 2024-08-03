let canvas = null;
let gl = null;
let program = null;
let resolution_loc = null;
let time_loc = null;
let noise_texture = null;

function createShader(gl, name, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) return shader;

    console.error("failed to compile", name);
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vs, fs) {
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) return program;

    console.error("failed to link program");
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

async function init(vs_src, fs_src) {
    const vert_shader = createShader(gl, "vertex", gl.VERTEX_SHADER, vs_src);
    const frag_shader = createShader(gl, "fragment", gl.FRAGMENT_SHADER, fs_src);
    program = createProgram(gl, vert_shader, frag_shader);

    resolution_loc = gl.getUniformLocation(program, "Resolution");
    time_loc       = gl.getUniformLocation(program, "Time");

    const pos_loc  = gl.getAttribLocation(program, "pos");
    const pos_buf  = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, pos_buf);

    // full screen triangle
    const positions = [
        -1, -1,
        -1,  3,
         3, -1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.useProgram(program);

    gl.enableVertexAttribArray(pos_loc);

    gl.bindBuffer(gl.ARRAY_BUFFER, pos_buf);

    gl.vertexAttribPointer(pos_loc, 2, gl.FLOAT, false, 0, 0);

    gl.uniform2f(resolution_loc, canvas.width, canvas.height);

    // generate image object
    noise_texture = gl.createTexture();

    // load image data
    const resp = await fetch("/assets/webgl/noise.png");
    if (!resp.ok) {
        console.error("could not load noise image");
        return;
    }

    const image_data = await resp.blob();
    const image = await createImageBitmap(image_data);

    // upload data to GPU
    gl.bindTexture(gl.TEXTURE_2D, noise_texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
}

function frame(time) {
    gl.uniform1f(time_loc, time / 1000.0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, noise_texture);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(frame);
}

self.onmessage = async (event) => {
    canvas = event.data.canvas;
    gl = canvas.getContext("webgl2", { alpha: false });
    if (gl === null) {
        console.error("could not initialise webgl context");
        return;
    }

    await init(event.data.vs_src, event.data.fs_src);
    requestAnimationFrame(frame);
}