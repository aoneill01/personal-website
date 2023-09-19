import "./style.css";
import { Game } from "./game.ts";
import { initTexture } from "./texture.ts";
import { initGl } from "./web-gl.ts";

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
        }
    });

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
        drawGl();
    }
}

init();
