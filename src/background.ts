type SvgInHtml = HTMLElement & SVGSVGElement;

const SVG_NS = "http://www.w3.org/2000/svg";
// Damped spring constants
const K = 0.00005;
const INVERSE_DAMP = 0.003;

const svg = document.getElementById("background")! as SvgInHtml;

class Hexagon {
    path: SVGPathElement;
    x: number;
    y: number;
    velocity: number = 0;
    scale: number = 1;
    destScale: number = 1;

    constructor(x: number, y: number, l: number) {
        this.x = x;
        this.y = y;

        const halfSqrt3 = Math.sqrt(3) / 2;

        // Draw the hexagon path
        const path = document.createElementNS(SVG_NS, "path");
        path.setAttribute(
            "d",
            `M ${x} ${y - l} l ${halfSqrt3 * l} ${0.5 * l} l 0 ${l} l ${-halfSqrt3 * l} ${
                0.5 * l
            } l ${-halfSqrt3 * l} ${-0.5 * l} l 0 ${-l} Z`
        );
        path.setAttribute("fill", "#e0e0e0");
        path.setAttribute("transform-origin", `${x} ${y}`);
        path.setAttribute("transform", "scale(1)");

        this.path = path;
    }

    handleMouseMove(x: number, y: number) {
        // Calculate desired scale based on distance to provided point
        const sqrtDist = Math.sqrt(Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2));
        this.destScale = (sqrtDist < 3 ? sqrtDist : 3) / 3;
    }

    handleTick(delta: number) {
        // Update the scale of this hexagon
        const saved = this.scale;
        this.velocity += K * (this.destScale - this.scale) * delta;
        this.scale += delta * this.velocity;
        this.velocity *= 1 - INVERSE_DAMP * delta;

        if (Math.abs(saved - this.scale) > 0.0001) {
            this.path.setAttribute("transform", `scale(${this.scale})`);
        }
    }
}

// Create a grid of hexagons
const hexagons: Hexagon[] = [];
for (let row = -1; row < 10; row++) {
    for (let col = -1; col < 17 - row * 2; col++) {
        const hexagon = new Hexagon(
            (col + (row % 2 === 0 ? 0 : 0.5)) * Math.sqrt(3),
            1.5 * row,
            1.02
        );
        hexagons.push(hexagon);
        svg.appendChild(hexagon.path);
    }
}

document.body.addEventListener("mousemove", ({ clientX, clientY }) => {
    // Translate the mouse position to svg coordinates
    let point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    point = point.matrixTransform(svg.getScreenCTM()!.inverse());

    for (const hexagon of hexagons) {
        hexagon.handleMouseMove(point.x, point.y);
    }
});

let lastTimer: number;
const tick = (timer: number) => {
    if (lastTimer) {
        const delta = Math.min(timer - lastTimer, 1000 / 20);

        for (const hexagon of hexagons) {
            hexagon.handleTick(delta);
        }
    }
    lastTimer = timer;
    window.requestAnimationFrame(tick);
};

window.requestAnimationFrame(tick);
