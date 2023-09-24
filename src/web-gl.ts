import { BOARD_HEIGHT, BOARD_WIDTH, Game } from "./game.ts";

const vs = `
attribute vec4 a_position;
attribute vec2 a_texcoord;

varying vec2 v_texcoord;

void main() {
  gl_Position = a_position;

  v_texcoord = a_texcoord;
}
`;

const fs = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_tickcount;

varying vec2 v_texcoord;

uniform sampler2D u_texture;

vec3 scanline(vec2 coord, vec3 screen)
{
    float intensity = 0.4 * (.75 + 0.25 * sin((coord.y + 2.0 * u_tickcount) / 30.0)) * 
      (1.0 + 0.1 *sin(2.0 * 3.1415 * (coord.x + 0.25)));
	screen.rgb -= (0.3 + sin(2.0 * 3.1415 * (coord.y + 0.25))) * intensity;
	return screen;
}

vec2 crt(vec2 coord, float bend)
{
	// put in symmetrical coords
	coord = (coord - 0.5) * 2.0;

	coord *= 1.1;	

	// deform coords
	coord.x *= 1.0 + pow((abs(coord.y) / bend), 2.0);
	coord.y *= 1.0 + pow((abs(coord.x) / bend), 2.0);

	// transform back to 0.0 - 1.0 space
	coord  = (coord / 2.0) + 0.5;

	return coord;
}

vec3 sampleSplit(sampler2D tex, vec2 coord)
{
    float intensity = 0.012 * (.8 + 0.2 * sin((coord.y + 2.0 * u_tickcount) / 30.0));
	vec3 frag;
	frag.r = texture2D(tex, vec2(coord.x - intensity * (0.5), coord.y)).r;
	frag.g = texture2D(tex, vec2(coord.x, coord.y)).g;
	frag.b = texture2D(tex, vec2(coord.x + intensity * (0.5), coord.y)).b;
	return frag;
}

void main() {
  vec2 uv = 0.5 * v_texcoord + 0.5;
  vec2 crtCoords = crt(uv, 3.2);

  if (crtCoords.x < 0.0 || crtCoords.x > 1.0 || crtCoords.y < 0.0 || crtCoords.y > 1.0)
		discard;

  gl_FragColor.a = 1.0;// = vec4(0.0, 0.0, 0.0, 1.0);
  gl_FragColor.rgb = sampleSplit(u_texture, crtCoords);

  vec2 screenSpace = crtCoords * vec2(${BOARD_WIDTH}.0,${BOARD_HEIGHT}.0);
  gl_FragColor.rgb = scanline(screenSpace, gl_FragColor.rgb);
}
`;

export function initGl(
    screenCanvas: HTMLCanvasElement,
    textureCanvas: HTMLCanvasElement
): (game: Game) => void {
    const gl = screenCanvas.getContext("webgl")!;
    // TODO !gl

    // setup GLSL program
    const program = createProgramFromSources(gl)!;
    // TODO handle errors

    // look up where the vertex data needs to go.
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

    var texcoordLocation = gl.getAttribLocation(program, "a_texcoord");

    // look up uniform locations
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    const tickCountLocation = gl.getUniformLocation(program, "u_tickcount");

    // Create a buffer to put three 2d clip space points in
    const positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.enableVertexAttribArray(texcoordLocation);
    // We'll supply texcoords as floats.
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

    // fill it with a 2 triangles that cover clipspace
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
    );

    const canvasTex = gl.createTexture();
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, canvasTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvas);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    return function drawGl(game: Game) {
        gl.bindTexture(gl.TEXTURE_2D, canvasTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvas);
        resizeCanvasToDisplaySize(<HTMLCanvasElement>gl.canvas);

        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Tell it to use our program (pair of shaders)
        gl.useProgram(program);

        // Turn on the attribute
        gl.enableVertexAttribArray(positionAttributeLocation);

        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
        gl.uniform1f(tickCountLocation, game.tickCount);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
}

function loadShader(
    gl: WebGLRenderingContext,
    shaderSource: string,
    shaderType: number
): WebGLShader {
    const shader = gl.createShader(shaderType)!;

    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        // Something went wrong during compilation; get the error
        const lastError = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);

        throw new Error(
            "*** Error compiling shader '" +
                shader +
                "':" +
                lastError +
                `\n` +
                shaderSource
                    .split("\n")
                    .map((l, i) => `${i + 1}: ${l}`)
                    .join("\n")
        );
    }

    return shader;
}

function createProgram(gl: WebGLRenderingContext, shaders: WebGLShader[]): WebGLProgram {
    const program = gl.createProgram()!;
    shaders.forEach(function (shader: WebGLShader) {
        gl.attachShader(program, shader);
    });
    gl.linkProgram(program);

    // Check the link status
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        // something went wrong with the link
        const lastError = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);

        throw new Error("Error in program linking:" + lastError);
    }
    return program;
}

function createProgramFromSources(gl: WebGLRenderingContext): WebGLProgram {
    const shaders = [loadShader(gl, vs, gl.VERTEX_SHADER), loadShader(gl, fs, gl.FRAGMENT_SHADER)];

    return createProgram(gl, shaders);
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): boolean {
    const width = canvas.clientWidth | 0;
    const height = canvas.clientHeight | 0;
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
}
