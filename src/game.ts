export const BOARD_WIDTH = 28 * 8;
export const BOARD_HEIGHT = 36 * 8;

export class Game {
    tickCount: number = 0;
    player: Player = new Player();
    controls: Controls = new Controls();
    bullets: Bullet[] = [];
    enemies: Enemy[] = messageToEnemies([
        {
            text: "PRESS ",
            color: 0,
        },
        {
            text: "SPACE ",
            color: 1,
        },
        {
            text: "TO FIRE",
            color: 0,
        },
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
            const angle = (Math.PI / 3) * Math.random() - Math.PI / 1.5;
            const velocity = Math.random() / 2 + 0.5;
            this.particles.push(
                new Particle(
                    x + Math.random() * 2,
                    y + Math.random() * 2,
                    velocity * Math.cos(angle),
                    velocity * Math.sin(angle),
                    color
                )
            );
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
        return x >= this.x && x < this.x + 8 && y >= this.y && y < this.y + 8;
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

type MessageBlock = {
    text: string;
    color: number;
};

function messageToEnemies(message: MessageBlock[]): Enemy[] {
    const result: Enemy[] = [];
    const totalLength = message.reduce((sum, mb) => sum + mb.text.length, 0);
    let i = Math.floor((28 - totalLength) / 2);
    for (const mb of message) {
        for (const letter of mb.text) {
            if (letter === " ") {
                i++;
                continue;
            }
            const y = letter.charCodeAt(0) - "A".charCodeAt(0);
            result.push(new Enemy(i, y, mb.color));
            i++;
        }
    }
    return result;
}
