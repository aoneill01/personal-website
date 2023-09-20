export const BOARD_WIDTH = 28 * 8;
export const BOARD_HEIGHT = 36 * 8;

export class Game {
    tickCount: number = 0;
    player: Player = new Player();
    controls: Controls = new Controls();
    bullets: Bullet[] = [];
    enemies: Enemy[] = getEnemies();
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

        this.enemies.forEach((enemy) => enemy.tick(this.tickCount));

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
            const velocity = Math.random() / 2 + 1;
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
    row: number;
    column: number;
    spriteY: number;
    spriteX: number;
    private mode: string = "waiting";
    private targetY?: number;
    private targetX?: number;
    private startTickCount?: number;

    constructor(row: number, column: number, spriteY: number, spriteX: number) {
        super(BOARD_HEIGHT, BOARD_WIDTH);
        this.row = row;
        this.column = column;
        this.spriteY = spriteY;
        this.spriteX = spriteX;
    }

    tick(tickCount: number) {
        const START_Y = 23 * 8;
        const FLY_IN_TICKS = 100;
        const P1 = {
            x: this.row % 2 === 0 ? -8 : BOARD_WIDTH,
            y: 8 * 4,
        };
        const P2 = {
            x: this.row % 2 === 0 ? BOARD_WIDTH : 0,
            y: 0,
        };

        switch (this.mode) {
            case "waiting":
                if (this.calculateY(tickCount) < START_Y) {
                    this.targetY = this.calculateY(tickCount + FLY_IN_TICKS + this.column * 8);
                    this.targetX = this.calculateX(tickCount + FLY_IN_TICKS + this.column * 8);
                    this.startTickCount = tickCount + this.column * 8;
                    this.mode = "flyIn";
                }

                break;
            case "flyIn":
                const t = (tickCount - this.startTickCount!) / FLY_IN_TICKS;
                this.y = (1 - t) ** 2 * P1.y + 2 * (1 - t) * t * P2.y + t ** 2 * this.targetY!;
                this.x = (1 - t) ** 2 * P1.x + 2 * (1 - t) * t * P2.x + t ** 2 * this.targetX!;
                if (t >= 1) this.mode = "group";
                break;
            case "group":
                this.y = this.calculateY(tickCount);
                this.x = this.calculateX(tickCount);
                break;
        }
    }

    isHit(x: number, y: number): boolean {
        return x >= this.x && x < this.x + 8 && y >= this.y && y < this.y + 8;
    }

    calculateY(tickCount: number) {
        const slowedCount = Math.floor(tickCount / 16);
        return 20 * 8 - slowedCount + 16 * this.row;
    }

    calculateX(tickCount: number) {
        const slowedCount = Math.floor(tickCount / 4);
        const remainder = slowedCount % 64;
        return (remainder < 32 ? remainder : 64 - remainder) - 16 + 8 * this.column;
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

function getEnemies(): Enemy[] {
    const result = [];
    const text = `Welcome My name is
*Andy ONeill*

*Space* to fire
*x* and *x* to move

I am a
software engineer

Check out my code
on *Github*

Find more info
on *LinkedIn*

I enjoy
retro gaming
mechanical keyboards
electronics
origami

I worked at
*Scratch*`.toUpperCase();

    const lines = text.split("\n");
    for (let row = 0; row < lines.length; row++) {
        const blocks = lines[row].split("*");
        let color = 0;
        const message = [];
        for (const block of blocks) {
            message.push({
                text: block,
                color,
            });
            color = (color + 1) % 2;
        }
        result.push(...messageToEnemies(message, row));
    }

    return result;
}

function messageToEnemies(message: MessageBlock[], row: number): Enemy[] {
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
            result.push(new Enemy(row, i, y, mb.color));
            i++;
        }
    }
    return result;
}
