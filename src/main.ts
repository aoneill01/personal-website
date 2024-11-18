import "./style.css";
import { Game } from "./game.ts";
import { initTexture } from "./texture.ts";
import { initArcade } from "./arcade.ts";

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

    const drawTexture = initTexture(textureCanvas);

    setInterval(gameLoop, 1000 / 60);

    function gameLoop() {
        // Process one game tick
        game.tick();
        // Draw to hidden canvas
        drawTexture(game);

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

    initArcade(game);

    console.log("%c👋 Welcome to my website! 👋", "font-size: 20px");
    console.log("%ctry running window.cheatMode()", "color: grey");
}

init();
