import sprites from './sprites.png';

const BOARD_WIDTH = 28 * 8;
const BOARD_HEIGHT = 36 * 8;

const vs = `
// an attribute will receive data from a buffer
attribute vec4 a_position;
attribute vec2 a_texcoord;

varying vec2 v_texcoord;

// all shaders have a main function
void main() {

  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = a_position;

  v_texcoord = a_texcoord;
}
`;

const fs = `
precision highp float;
uniform vec2 u_resolution;

varying vec2 v_texcoord;

uniform sampler2D u_texture;

vec3 scanline(vec2 coord, vec3 screen)
{
	screen.rgb -= sin(2.0 * 3.1415 * (coord.y + 0.25)) * 0.15;
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
	vec3 frag;
	frag.r = texture2D(tex, vec2(coord.x - 0.015 * (coord.x - 0.5), coord.y)).r;
	frag.g = texture2D(tex, vec2(coord.x, coord.y)).g;
	frag.b = texture2D(tex, vec2(coord.x + 0.015 * (coord.x - 0.5), coord.y)).b;
	return frag;
}


void main() {
  // gl_FragColor is a special variable a fragment shader
  // is responsible for setting

  // gl_FragColor = vec4(fract(gl_FragCoord.xy / u_resolution), 0, 1);
  vec2 uv = 0.5 * v_texcoord + 0.5;
  vec2 crtCoords = crt(uv, 3.2);
//   uv.y = 0.5 * uv.y;
if (crtCoords.x < 0.0 || crtCoords.x > 1.0 || crtCoords.y < 0.0 || crtCoords.y > 1.0)
		discard;

  //gl_FragColor = texture2D(u_texture, crtCoords);
  gl_FragColor.a = 1.0;// = vec4(0.0, 0.0, 0.0, 1.0);
  gl_FragColor.rgb = sampleSplit(u_texture, crtCoords);

  vec2 screenSpace = crtCoords * 288.0;
  gl_FragColor.rgb = scanline(screenSpace, gl_FragColor.rgb);
}
`;

export class Game {
    tickCount: number = 0;
    player: Player = new Player();
    controls: Controls = new Controls();
    bullets: Bullet[] = [];
    enemies: Enemy[] = messageToEnemies([
        {
            text: "PRESS ",
            color: 0
        },
        {
            text: "SPACE ",
            color: 1
        },
        {
            text: "TO FIRE",
            color: 0
        }
    ]);
    stars: Star[] = [];
    particles: Particle[] = [];

    constructor() {
        for (let i = 0; i < 100; i++) {
            this.stars.push(new Star());
        }
    }

    tick() {
        this.tickCount++;

        if (this.controls.left) {
            this.player.x -= 2;
            if (this.player.x < 0) this.player.x = 0;
        }
        if (this.controls.right) {
            this.player.x += 2;
            if (this.player.x > BOARD_WIDTH - 16) this.player.x = BOARD_WIDTH - 16;
        }
        if (this.controls.fire) {
            this.controls.fire = false;
            this.bullets.push(new Bullet(this.player.x + 7, this.player.y));
        }

        const tmp = this.tickCount % 256;
        let offset = (tmp < 128 ? tmp : 256 - tmp) / 4 - 16;

        this.enemies.forEach((enemy) => enemy.updatePosition(offset));

        this.bullets.forEach((bullet) => {
            bullet.tick();
            const hit = this.enemies.find((enemy) => enemy.isHit(bullet.x, bullet.y));
            if (hit) {
                bullet.dead = true;
                this.enemies = this.enemies.filter((enemy) => enemy !== hit);
                this.createExplosion(hit.x + 4, hit.y + 4, hit.spriteX);
            }
        });
        this.bullets = this.bullets.filter((bullet) => bullet.isLive());

        this.particles.forEach((particles) => particles.tick());
        this.particles = this.particles.filter((particle) => !particle.dead);
    }

    createExplosion(x: number, y: number, color: number) {
        for (let i = 0; i < 8; i++) {
            const angle = Math.PI / 3 * Math.random() - Math.PI / 1.5;
            const velocity = Math.random() / 2 + .5;
            this.particles.push(new Particle(x + Math.random() * 2, y + Math.random() * 2, velocity * Math.cos(angle), velocity * Math.sin(angle), color));
        }
    }
}

class Sprite {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

class Player extends Sprite {
    constructor() {
        super(13 * 8, 34 * 8);
    }
}

class Enemy extends Sprite {
    column: number;
    spriteY: number;
    spriteX: number;

    constructor(column: number, spriteY: number, spriteX: number) {
        super(0, 16 * 8);
        this.column = column;
        this.spriteY = spriteY;
        this.spriteX = spriteX;
    }

    updatePosition(offset: number) {
        this.x = offset + 8 * this.column;
    }

    isHit(x: number, y: number): boolean {
        return x >= this.x && x < this.x + 8
            && y >= this.y && y < this.y + 8;
    }
}

class Bullet extends Sprite {
    dead: boolean = false;

    constructor(x: number, y: number) {
        super(x, y);
    }

    tick() {
        this.y -= 5;
    }

    isLive() {
        return this.y > 0 && this.y < BOARD_HEIGHT && !this.dead;
    }
}

class Star extends Sprite {
    depth: number;

    constructor() {
        super(Math.floor(Math.random() * BOARD_WIDTH), Math.floor(Math.random() * BOARD_HEIGHT));
        this.depth = Math.floor(Math.random() * 3);
    }
}

class Particle extends Sprite {
    vx: number;
    vy: number;
    color: number;
    dead: boolean = false;

    constructor(x: number, y: number, vx: number, vy: number, color: number) {
        super(x, y);
        this.vx = vx;
        this.vy = vy;
        this.color = color;
    }

    tick() {
        this.x += this.vx;
        this.y += this.vy;
        this.dead = this.x < 0 || this.x > BOARD_WIDTH || this.y < 0 || this.y > BOARD_HEIGHT;
    }
}

class Controls {
    left: boolean = false;
    right: boolean = false;
    fire: boolean = false;
}

function init() {
    const game = new Game();

    const spritesImage = new Image();
    spritesImage.src = sprites;

    document.addEventListener('keydown', (ev) => {
        switch (ev.key) {
            case 'ArrowLeft':
                game.controls.left = true;
                break;
            case 'ArrowRight':
                game.controls.right = true;
                break;
            case ' ':
                if (!ev.repeat) game.controls.fire = true;
                break;
        }
    });

    document.addEventListener('keyup', (ev) => {
        switch (ev.key) {
            case 'ArrowLeft':
                game.controls.left = false;
                break;
            case 'ArrowRight':
                game.controls.right = false;
                break;
        }
    });

    const textureCanvas = <HTMLCanvasElement>document.getElementById('texture');
    const ctx = textureCanvas.getContext('2d')!;

    const glCanvas = <HTMLCanvasElement>document.getElementById('screen');
    const gl = glCanvas.getContext("webgl")!;
    // TODO !gl


    // setup GLSL program
    const program = createProgramFromSources(gl, [vs, fs])!;

    // look up where the vertex data needs to go.
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

    var texcoordLocation = gl.getAttribLocation(program, "a_texcoord");

    // look up uniform locations
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    // Create a buffer to put three 2d clip space points in
    const positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.enableVertexAttribArray(texcoordLocation);
    // We'll supply texcoords as floats.
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

    // fill it with a 2 triangles that cover clipspace
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1,  // first triangle
        1, -1,
        -1, 1,
        -1, 1,  // second triangle
        1, -1,
        1, 1,
    ]), gl.STATIC_DRAW);

    const canvasTex = gl.createTexture();
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, canvasTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvas);
    // make sure we can render it even if it's not a power of 2
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    function glDraw() {
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
        gl.vertexAttribPointer(
            positionAttributeLocation,
            2,          // 2 components per iteration
            gl.FLOAT,   // the data is 32bit floats
            false,      // don't normalize the data
            0,          // 0 = move forward size * sizeof(type) each iteration to get the next position
            0,          // start at the beginning of the buffer
        );

        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

        gl.drawArrays(
            gl.TRIANGLES,
            0,     // offset
            6,     // num vertices to process
        );
    }

    setInterval(gameLoop, 1000 / 60);

    function gameLoop() {
        game.tick();
        draw();
        glDraw();
    }

    function draw() {

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

        const colors = [
            '#887722',
            '#776611',
            '#665500'
        ];
        for (const star of game.stars) {
            ctx.fillStyle = colors[star.depth];
            ctx.fillRect(star.x, Math.floor((star.y + game.tickCount * (.2 - .05 * star.depth)) % BOARD_HEIGHT), 1, 1);
        }

        ctx.drawImage(spritesImage, 0, 37 * 8, 16, 8, Math.round(game.player.x), Math.round(game.player.y), 16, 8);

        ctx.fillStyle = 'red';
        for (const bullet of game.bullets) {
            ctx.fillRect(Math.round(bullet.x), Math.round(bullet.y), 2, 6);
        }

        for (const particle of game.particles) {
            ctx.fillStyle = ['white', '#07FFFF'][particle.color];

            ctx.fillRect(Math.round(particle.x) - 1, Math.round(particle.y) - 1, 2, 2);
        }

        let i = 0;
        for (const enemy of game.enemies) {
            ctx.drawImage(spritesImage, enemy.spriteX * 8, enemy.spriteY * 8, 8, 8, Math.round(enemy.x), Math.round(enemy.y), 8, 8);
            i++;
        }
    }
}

const defaultShaderType = [
    'VERTEX_SHADER',
    'FRAGMENT_SHADER',
];

function loadShader(gl: WebGLRenderingContext, shaderSource: string, shaderType: number): WebGLShader | null {
    // Create the shader object
    const shader = gl.createShader(shaderType)!;

    // Load the shader source
    gl.shaderSource(shader, shaderSource);

    // Compile the shader
    gl.compileShader(shader);

    // Check the compile status
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        // Something went wrong during compilation; get the error
        const lastError = gl.getShaderInfoLog(shader);
        console.error('*** Error compiling shader \'' + shader + '\':' + lastError + `\n` + shaderSource.split('\n').map((l, i) => `${i + 1}: ${l}`).join('\n'));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function createProgram(gl: WebGLRenderingContext, shaders: (WebGLShader | null)[]) {
    const program = gl.createProgram()!;
    shaders.forEach(function (shader: WebGLShader | null) {
        if (!shader) return;
        gl.attachShader(program, shader);
    });
    gl.linkProgram(program);

    // Check the link status
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        // something went wrong with the link
        const lastError = gl.getProgramInfoLog(program);
        console.error('Error in program linking:' + lastError);

        gl.deleteProgram(program);
        return null;
    }
    return program;
}

function createProgramFromSources(gl: WebGLRenderingContext, shaderSources: string[]) {
    const shaders = [];
    for (let ii = 0; ii < shaderSources.length; ++ii) {
        shaders.push(loadShader(
            gl, shaderSources[ii], (<any>gl)[defaultShaderType[ii]]));
    }
    return createProgram(gl, shaders);
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement, multiplier: number = 1) {
    const width = canvas.clientWidth * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
}

type MessageBlock = {
    text: string,
    color: number
};

function messageToEnemies(message: MessageBlock[]): Enemy[] {
    const result: Enemy[] = [];
    const totalLength = message.reduce((sum, mb) => sum + mb.text.length, 0);
    let i = Math.floor((28 - totalLength) / 2);
    for (const mb of message) {
        for (const letter of mb.text) {
            if (letter === ' ') {
                i++;
                continue;
            }
            const y = letter.charCodeAt(0) - 'A'.charCodeAt(0);
            result.push(new Enemy(i, y, mb.color));
            i++;
        }
    }
    return result;
}

init();