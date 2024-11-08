import "./style.css";
import { Game, SCREEN_WIDTH, SCREEN_HEIGHT } from "./game.ts";
import { initTexture } from "./texture.ts";
import { initGl } from "./web-gl.ts";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

declare global {
    interface Window {
        cheatMode: () => void;
    }
}

function init() {
    const game = new Game();

    document.addEventListener("keydown", (ev) => {
        switch (ev.key) {
            case "ArrowLeft":
                game.controls.left = true;
                break;
            case "ArrowRight":
                game.controls.right = true;
                break;
            case " ":
                ev.preventDefault();
                if (!ev.repeat) game.controls.fire = true;
                break;
        }
    });

    document.addEventListener("keyup", (ev) => {
        switch (ev.key) {
            case "ArrowLeft":
                game.controls.left = false;
                break;
            case "ArrowRight":
                game.controls.right = false;
                break;
            case " ":
                game.controls.fire = false;
                break;
        }
    });

    window.cheatMode = () => {
        game.turbo = true;
        console.log("IT'S DANGEROUS TO GO ALONE! TAKE THIS.");
    };

    const textureCanvas = <HTMLCanvasElement>document.getElementById("texture");
    const screenCanvas = <HTMLCanvasElement>document.getElementById("screen");

    const drawTexture = initTexture(textureCanvas);
    const drawGl = initGl(screenCanvas, textureCanvas);

    setInterval(gameLoop, 1000 / 60);

    function gameLoop() {
        // Process one game tick
        game.tick();
        // Draw to hidden canvas
        drawTexture(game);
        // Draw to screen with shader effects
        drawGl(game);

        if (game.tickCount === 2395) {
            document.getElementById("github")?.classList.add("show");
        }
        if (game.tickCount === 3150) {
            document.getElementById("linkedin")?.classList.add("show");
        }
        if (game.tickCount === 3435) {
            document.getElementById("resume")?.classList.add("show");
        }
        if (game.tickCount === 4665) {
            document.getElementById("scratch")?.classList.add("show");
        }
    }

    console.log("%c👋 Welcome to my website! 👋", "font-size: 20px");
    console.log("%ctry running window.cheatMode()", "color: grey");
}

function generateCrtGeometry(widthAngle: number, widthDivisions: number) {
    const geometry = new THREE.BufferGeometry();

    const heightAngle = (widthAngle * SCREEN_HEIGHT) / SCREEN_WIDTH;
    const heightDivisions = Math.round((widthDivisions * SCREEN_HEIGHT) / SCREEN_WIDTH);

    const toIndex = (row: number, col: number) => row * (widthDivisions + 1) + col;

    const vertices = [];
    const indices = [];
    const uvs = [];

    for (let row = 0; row <= heightDivisions; row++) {
        for (let col = 0; col <= widthDivisions; col++) {
            const xRot = heightAngle * (-0.5 + row / heightDivisions);
            const yRot = widthAngle * (-0.5 + col / widthDivisions);
            const sinXRot = Math.sin(xRot);
            const cosXRot = Math.cos(xRot);
            const sinYRot = Math.sin(yRot);
            const cosYRot = Math.cos(yRot);
            let x = 0;
            let y = 0;
            let z = 10;
            y = y * cosXRot - z * sinXRot;
            z = y * sinXRot + z * cosXRot;
            x = x * cosYRot + z * sinYRot;
            z = -x * sinYRot + z * cosYRot;
            z -= 10;
            vertices.push(x, y, z);
            uvs.push(col / widthDivisions, 1 - row / heightDivisions);
            if (row !== 0 && col !== 0) {
                indices.push(
                    toIndex(row, col),
                    toIndex(row - 1, col),
                    toIndex(row, col - 1),
                    toIndex(row, col - 1),
                    toIndex(row - 1, col),
                    toIndex(row - 1, col - 1)
                );
            }
        }
    }

    geometry.setIndex(indices);
    geometry.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(uvs), 2));
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3));

    return geometry;
}

const texture = new THREE.CanvasTexture(document.getElementById("texture")!);
texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.LinearFilter;
let uniforms = {
    uTexture: { value: texture },
    u_tickcount: { value: 0.0 },
};

function generateCrtMaterial() {
    const vertexShader = `
    varying vec2 vUv; 

    void main() {
      vUv = uv;

      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
`;

    const fragmentShader = `
      uniform vec3 colorA; 
      uniform vec3 colorB;
      uniform sampler2D uTexture;
      uniform float u_tickcount;
      varying vec2 vUv;

      vec3 scanline(vec2 coord, vec3 screen)
        {
            float intensity = 0.2 * (.75 + 0.25 * sin((coord.y + 200.0 * u_tickcount) / 30.0)) * 
            (1.0 + 0.1 *sin(2.0 * 3.1415 * (coord.x + 0.25)));
            screen.rgb -= (0.3 + sin(2.0 * 3.1415 * (coord.y + 0.25))) * intensity;
            return screen;
        }

      vec3 sampleSplit(sampler2D tex, vec2 coord)
        {
            float intensity = 0.012 * (.8 + 0.2 * sin((coord.y + 200.0 * u_tickcount) / 30.0));
            vec3 frag;
            frag.r = texture2D(tex, vec2(coord.x - intensity * (0.5) + intensity, coord.y)).r;
            frag.g = texture2D(tex, vec2(coord.x + intensity, coord.y)).g;
            frag.b = texture2D(tex, vec2(coord.x + intensity * (0.5) + intensity, coord.y)).b;
            return frag;
        }

      void main() {
        gl_FragColor.a = 1.0;
        gl_FragColor.rgb = sampleSplit(uTexture, vUv);

        vec2 screenSpace = vUv * vec2(224.0, 288.0);
        gl_FragColor.rgb = scanline(screenSpace, gl_FragColor.rgb);
      }
`;

    return new THREE.ShaderMaterial({
        uniforms: uniforms,
        fragmentShader: fragmentShader,
        vertexShader: vertexShader,
    });
}

init();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector("main")?.appendChild(renderer.domElement);

const loader = new GLTFLoader();

loader.load(
    "arcade_machine_final.glb",
    function (gltf) {
        gltf.scene.scale.set(0.85, 0.85, 0.85);
        gltf.scene.translateY(-6.65);
        gltf.scene.translateX(-1.92);
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

const geometry = generateCrtGeometry(Math.PI / 16, 16);
geometry.rotateX(-0.45);
geometry.translate(0, 0, -0.5);
// const geometry = new THREE.BufferGeometry();

// const vertices = new Float32Array([
//     -1.0,
//     -1.25,
//     1.0, // v0
//     1.0,
//     -1.25,
//     1.0, // v1
//     1.0,
//     1.25,
//     1.0, // v2
//     -1.0,
//     1.25,
//     1.0, // v3
// ]);

// const uvs = new Float32Array([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0]);

// const indices = [0, 1, 2, 2, 3, 0];

// geometry.setIndex(indices);
// geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
// geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
// const material = new THREE.MeshBasicMaterial({ map: texture });
const material = generateCrtMaterial();

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const light = new THREE.HemisphereLight(0xffffff, 0x080868);
light.position.set(-1.25, 1, 1.25);
scene.add(light);

camera.position.z = 3;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const clock = new THREE.Clock();

function animate() {
    controls.update();

    uniforms.u_tickcount.value = clock.getElapsedTime();
    texture.needsUpdate = true;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
