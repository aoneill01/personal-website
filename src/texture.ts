import { BOARD_HEIGHT, BOARD_WIDTH, Game } from "./game.ts";
import sprites from "./sprites.png";

// Sprite sheet of graphics.
// Should probably wait for it to load, but it is small.
const spritesImage = new Image();
spritesImage.src = sprites;

export function initTexture(textureCanvas: HTMLCanvasElement): (game: Game) => void {
    const ctx = textureCanvas.getContext("2d")!;

    return function draw(game: Game) {
        // Clear the screen
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

        // Starfield background
        const colors = ["#887722", "#776611", "#665500"];
        for (const star of game.stars) {
            ctx.fillStyle = colors[star.depth];
            ctx.fillRect(
                star.x,
                Math.floor((star.y + game.tickCount * (0.2 - 0.05 * star.depth)) % BOARD_HEIGHT),
                1,
                1
            );
        }

        // Bullets
        ctx.fillStyle = "red";
        for (const bullet of game.bullets) {
            ctx.fillRect(Math.round(bullet.x), Math.round(bullet.y), 2, 6);
        }

        // Explosion particles
        for (const particle of game.particles) {
            ctx.fillStyle = ["white", "#07FFFF"][particle.color];

            ctx.fillRect(Math.round(particle.x) - 1, Math.round(particle.y) - 1, 2, 2);
        }

        // Enemies
        let i = 0;
        for (const enemy of game.enemies) {
            ctx.drawImage(
                spritesImage,
                enemy.spriteX * 8,
                enemy.spriteY * 8,
                8,
                8,
                Math.round(enemy.x),
                Math.round(enemy.y),
                8,
                8
            );
            i++;
        }

        // Player's ship
        ctx.drawImage(
            spritesImage,
            0,
            37 * 8,
            16,
            8,
            Math.round(game.player.x),
            Math.round(game.player.y),
            16,
            8
        );
    };
}
