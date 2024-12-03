import {
    AmbientLight,
    BufferAttribute,
    BufferGeometry,
    CanvasTexture,
    Group,
    IUniform,
    LinearFilter,
    Mesh,
    Object3D,
    PerspectiveCamera,
    Scene,
    ShaderMaterial,
    WebGLRenderer,
} from "three";
import { GLTFLoader, Timer } from "three/examples/jsm/Addons.js";
import { Game, SCREEN_HEIGHT, SCREEN_WIDTH } from "./game";
import vertexShader from "./shaders/vertex.glsl?raw";
import fragmentShader from "./shaders/fragment.glsl?raw";
import gsap from "gsap";

const lookAtScreen = {
    x: 0,
    y: 15,
    z: 0,
};

const standingPosition = {
    x: 0,
    y: 17.0,
    z: 6,
};

export function initArcade(game: Game) {
    const texture = new CanvasTexture(document.getElementById("texture")!);
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    let uniforms = {
        uTexture: { value: texture },
        u_tickcount: { value: 0.0 },
    };

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector("main")?.appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    const loader = new GLTFLoader();
    let controller: Object3D;
    let button: Object3D;

    loader.load(
        "arcade.glb",
        function (gltf) {
            controller = gltf.scene.children.find((child) => child.name === "Joystick")!;
            button = gltf.scene.children.find((child) => child.name === "Fire_Button")!;
            scene.add(gltf.scene);
            renderer.setAnimationLoop(animate);

            gsap.to(boom.rotation, { duration: 3, y: 0 });
            gsap.to(camera.position, {
                duration: 5,
                x: standingPosition.x,
                y: standingPosition.y,
                z: standingPosition.z,
                onUpdate: () => {
                    camera.lookAt(lookAtScreen.x, lookAtScreen.y, lookAtScreen.z);
                },
                onComplete: () => {
                    game.started = true;

                    addEventListener("mousemove", (event) => {
                        targetY = (2 * event.clientY) / window.innerHeight - 1;
                        targetX = (2 * event.clientX) / window.innerWidth - 1;
                    });
                },
            });
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );

    scene.add(generateCrt(Math.PI / 24, 16, uniforms));

    const light = new AmbientLight(0xffeeee);
    scene.add(light);

    const boom = new Group();
    boom.add(camera);
    scene.add(boom);
    boom.rotation.y = Math.PI / 2;
    camera.position.z = 50;
    camera.position.y = 30;
    camera.lookAt(lookAtScreen.x, lookAtScreen.y, lookAtScreen.z);

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let controllerAngle = 0;

    const timer = new Timer();

    function animate(timestamp: number) {
        timer.update(timestamp);
        const delta = timer.getDelta();
        if (delta === 0) return;

        if (game.started) {
            y += 10 * (targetY - y) * delta;
            x += 10 * (targetX - x) * delta;
            camera.lookAt(lookAtScreen.x, -1.5 * y + lookAtScreen.y, lookAtScreen.z);
            camera.position.z = standingPosition.z + 2 * x ** 2 + 2 * y ** 2;
            boom.rotation.y = -x;
        }

        if (controller) {
            if (game.controls.left) {
                controllerAngle += 10 * (0.25 - controllerAngle) * delta;
            } else if (game.controls.right) {
                controllerAngle += 10 * (-0.25 - controllerAngle) * delta;
            } else {
                controllerAngle += 10 * (0.0 - controllerAngle) * delta;
            }
            controller.rotation.set(0, 0, controllerAngle);
        }
        if (button) {
            button.position.setY(12.079902648925781 + (game.controls.firePressed ? -0.05 : 0));
        }
        uniforms.u_tickcount.value = timer.getElapsed();
        texture.needsUpdate = true;
        renderer.render(scene, camera);
    }
}

function generateCrt(
    widthAngle: number,
    widthDivisions: number,
    uniforms: { [uniform: string]: IUniform }
) {
    const crtGeometry = new BufferGeometry();

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

    crtGeometry.setIndex(indices);
    crtGeometry.setAttribute("uv", new BufferAttribute(new Float32Array(uvs), 2));
    crtGeometry.setAttribute("position", new BufferAttribute(new Float32Array(vertices), 3));

    crtGeometry.scale(3.5, 3.5, 3.5);
    crtGeometry.rotateX(-0.261799);
    crtGeometry.translate(0, 15.1, -0.2);

    const material = generateCrtMaterial(uniforms);

    return new Mesh(crtGeometry, material);
}

function generateCrtMaterial(uniforms: { [uniform: string]: IUniform }) {
    return new ShaderMaterial({
        uniforms: uniforms,
        fragmentShader: fragmentShader,
        vertexShader: vertexShader,
    });
}
