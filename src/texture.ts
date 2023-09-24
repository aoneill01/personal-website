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
        ctx.fillStyle = "#FF9F07";
        for (const bullet of game.enemyBullets) {
            ctx.fillRect(Math.round(bullet.x), Math.round(bullet.y), 2, -6);
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
        if (
            game.player.mode === "alive" ||
            (game.player.mode === "iframe" && Math.floor(game.tickCount / 4) % 2 === 0)
        ) {
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
        }

        for (let i = 0; i < 4; i++) {
            ctx.save();
            if (i >= game.player.lives - 1) ctx.globalAlpha = 0.1;

            ctx.drawImage(spritesImage, 0, 38 * 8, 8, 8, 16 + i * 10, 35 * 8, 8, 8);
            ctx.restore();
        }

        // Free play

        ctx.save();
        if (Math.floor(game.tickCount / 32) % 2 === 0) {
            ctx.globalAlpha = 0.1;
        }
        ctx.drawImage(spritesImage, 8, 5 * 8, 8, 8, 10 * 8 - 4, 35 * 8 - 4, 8, 8);
        ctx.drawImage(spritesImage, 8, 17 * 8, 8, 8, 11 * 8 - 4, 35 * 8 - 4, 8, 8);
        ctx.drawImage(spritesImage, 8, 4 * 8, 8, 8, 12 * 8 - 4, 35 * 8 - 4, 8, 8);
        ctx.drawImage(spritesImage, 8, 4 * 8, 8, 8, 13 * 8 - 4, 35 * 8 - 4, 8, 8);
        ctx.drawImage(spritesImage, 8, 15 * 8, 8, 8, 15 * 8 - 4, 35 * 8 - 4, 8, 8);
        ctx.drawImage(spritesImage, 8, 11 * 8, 8, 8, 16 * 8 - 4, 35 * 8 - 4, 8, 8);
        ctx.drawImage(spritesImage, 8, 0 * 8, 8, 8, 17 * 8 - 4, 35 * 8 - 4, 8, 8);
        ctx.drawImage(spritesImage, 8, 24 * 8, 8, 8, 18 * 8 - 4, 35 * 8 - 4, 8, 8);
        ctx.restore();

        // Score
        let tmp = game.player.score;
        let j = 0;
        while (j === 0 || tmp !== 0) {
            const ones = tmp % 10;
            ctx.drawImage(
                spritesImage,
                8,
                (27 + ones) * 8,
                8,
                8,
                BOARD_WIDTH - 24 - 8 * j,
                4,
                8,
                8
            );
            tmp = Math.floor(tmp / 10);
            j++;
        }
    };
}
