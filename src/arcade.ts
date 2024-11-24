import {
    AmbientLight,
    BufferAttribute,
    BufferGeometry,
    CanvasTexture,
    DirectionalLight,
    Group,
    IUniform,
    Light,
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
        "arcade_machine_final.glb",
        function (gltf) {
            console.log(gltf.scene);
            controller = gltf.scene.children.find((child) => child.name === "joystick")!;
            button = gltf.scene.children.find((child) => child.name === "button")!;
            gltf.scene.scale.set(0.85, 0.85, 0.85);
            gltf.scene.translateY(-6.65);
            gltf.scene.translateX(-1.92);
            scene.add(gltf.scene);
            renderer.setAnimationLoop(animate);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );

    scene.add(generateCrt(Math.PI / 24, 16, uniforms));

    // const light = new HemisphereLight(0xff99ff, 0xffff99, 4);
    let light: Light = new DirectionalLight(0xffffff, 5);
    light.position.set(20, 20, 10);
    scene.add(light);

    light = new DirectionalLight(0xff99dd, 0.5);
    light.position.set(-40, 20, 20);
    scene.add(light);

    light = new AmbientLight(0xff5555);
    scene.add(light);

    const boom = new Group();
    boom.add(camera);
    scene.add(boom);
    camera.position.z = 2;
    camera.position.y = 1.0;
    camera.lookAt(0, -0.5, -2);

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let controllerAngle = 0;

    addEventListener("mousemove", (event) => {
        targetY = (2 * event.clientY) / window.innerHeight - 1;
        targetX = (2 * event.clientX) / window.innerWidth - 1;
    });

    const timer = new Timer();

    function animate(timestamp: number) {
        timer.update(timestamp);
        const delta = timer.getDelta();
        if (delta === 0) return;

        y += 10 * (targetY - y) * delta;
        x += 10 * (targetX - x) * delta;
        camera.lookAt(0, -1.5 * y - 0.5, -2);
        camera.position.z = 2 + 2 * x ** 2;
        boom.rotation.y = -x;

        if (controller) {
            if (game.controls.left) {
                controllerAngle += 10 * (0.5 - controllerAngle) * delta;
            } else if (game.controls.right) {
                controllerAngle += 10 * (-0.5 - controllerAngle) * delta;
            } else {
                controllerAngle += 10 * (0.0 - controllerAngle) * delta;
            }
            controller.rotation.set(0, 0, controllerAngle);
        }
        if (button) {
            button.position.setY(5.975976943969727 + (game.controls.firePressed ? -0.02 : 0));
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

    crtGeometry.scale(1.6, 1.6, 1.6);
    crtGeometry.rotateX(-0.45);
    crtGeometry.translate(0, -0.1, -0.75);

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
