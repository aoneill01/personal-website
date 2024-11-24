import { SCREEN_HEIGHT, SCREEN_WIDTH, Game, PlayerMode } from "./game.ts";
import sprites from "./images/sprites.png";

// Sprite sheet of graphics.
// Should probably wait for it to load, but it is small.
const spritesImage = new Image();
spritesImage.src = sprites;
const SPRITE_SIZE = 8;

export function initTexture(textureCanvas: HTMLCanvasElement): (game: Game) => void {
    const ctx = textureCanvas.getContext("2d")!;

    function drawSprite(column: number, row: number, dx: number, dy: number) {
        ctx.drawImage(
            spritesImage,
            column * SPRITE_SIZE,
            row * SPRITE_SIZE,
            SPRITE_SIZE,
            SPRITE_SIZE,
            dx,
            dy,
            SPRITE_SIZE,
            SPRITE_SIZE
        );
    }

    return function drawTexture(game: Game) {
        // Clear the screen
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

        if (!game.started) {
            ctx.beginPath();
            ctx.strokeStyle = "white";
            for (let x = SPRITE_SIZE; x < SCREEN_WIDTH - SPRITE_SIZE; x += 2 * SPRITE_SIZE) {
                for (let y = SPRITE_SIZE; y < SCREEN_HEIGHT - SPRITE_SIZE; y += 2 * SPRITE_SIZE) {
                    ctx.rect(x + 0.5, y + 0.5, 2 * SPRITE_SIZE - 1, 2 * SPRITE_SIZE - 1);
                }
            }
            ctx.stroke();
            return;
        }

        // Starfield background
        const colors = ["#887722", "#776611", "#665500"];
        for (const star of game.stars) {
            ctx.fillStyle = colors[star.depth];
            ctx.fillRect(
                star.x,
                Math.floor((star.y + game.tickCount * (0.2 - 0.05 * star.depth)) % SCREEN_HEIGHT),
                1,
                1
            );
        }

        // Bullets
        ctx.fillStyle = "#FF0033";
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
            drawSprite(enemy.spriteX, enemy.spriteY, Math.round(enemy.x), Math.round(enemy.y));
            i++;
        }

        // Player's ship
        if (
            game.player.mode === PlayerMode.Alive ||
            (game.player.mode === PlayerMode.Iframe && Math.floor(game.tickCount / 4) % 2 === 0)
        ) {
            drawSprite(0, 37, Math.round(game.player.x), Math.round(game.player.y));
            drawSprite(1, 37, Math.round(game.player.x) + SPRITE_SIZE, Math.round(game.player.y));
        }

        for (let i = 0; i < 4; i++) {
            ctx.save();
            if (i >= game.player.lives - 1) ctx.globalAlpha = 0.1;

            drawSprite(0, 38, 16 + i * 10, 35 * SPRITE_SIZE);

            ctx.restore();
        }

        // Free play

        ctx.save();
        if (Math.floor(game.tickCount / 32) % 2 === 0) {
            ctx.globalAlpha = 0.1;
        }
        drawSprite(1, 5, 10 * SPRITE_SIZE - 4, 35 * SPRITE_SIZE - 4);
        drawSprite(1, 17, 11 * SPRITE_SIZE - 4, 35 * SPRITE_SIZE - 4);
        drawSprite(1, 4, 12 * SPRITE_SIZE - 4, 35 * SPRITE_SIZE - 4);
        drawSprite(1, 4, 13 * SPRITE_SIZE - 4, 35 * SPRITE_SIZE - 4);
        drawSprite(1, 15, 15 * SPRITE_SIZE - 4, 35 * SPRITE_SIZE - 4);
        drawSprite(1, 11, 16 * SPRITE_SIZE - 4, 35 * SPRITE_SIZE - 4);
        drawSprite(1, 0, 17 * SPRITE_SIZE - 4, 35 * SPRITE_SIZE - 4);
        drawSprite(1, 24, 18 * SPRITE_SIZE - 4, 35 * SPRITE_SIZE - 4);

        ctx.restore();

        // Score
        let tmp = game.player.score;
        let j = 0;
        while (j === 0 || tmp !== 0) {
            const ones = tmp % 10;
            drawSprite(1, 27 + ones, SCREEN_WIDTH - 24 - SPRITE_SIZE * j, 4);

            tmp = Math.floor(tmp / 10);
            j++;
        }
    };
}
