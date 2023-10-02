import explosionWav from "./sounds/explosion.wav";
import laserShootWav from "./sounds/laserShoot.wav";
import hitHurtWav from "./sounds/hitHurt.wav";

const ENEMY_SIZE = 8;
const COLUMNS = 28;
const ROWS = 36;

export const SCREEN_WIDTH = COLUMNS * ENEMY_SIZE;
export const SCREEEN_HEIGHT = ROWS * ENEMY_SIZE;

const explosion = new Audio(explosionWav);
const laserShoot = new Audio(laserShootWav);
const hitHurt = new Audio(hitHurtWav);

export class Game {
    tickCount: number = 0;
    player: Player = new Player();
    controls: Controls = new Controls();
    bullets: Bullet[] = [];
    enemyBullets: Bullet[] = [];
    enemies: Enemy[] = [];
    enemyGenerator: Generator<Enemy[]>;
    stars: Star[] = [];
    particles: Particle[] = [];
    turbo: boolean = false;
    fireCountdown: number = 0;

    constructor() {
        this.enemyGenerator = getEnemies();

        this.enemies.push(...this.enemyGenerator.next().value);
        this.enemies.push(...this.enemyGenerator.next().value);
        for (let i = 0; i < 100; i++) {
            this.stars.push(new Star());
        }
    }

    tick() {
        this.tickCount++;

        // Time to spawn more enemies
        if (this.tickCount % (16 * 8) === 0) {
            this.enemies.push(...this.enemyGenerator.next().value);
        }

        // Player controls
        if (this.controls.left && this.player.mode !== PlayerMode.Dead) {
            this.player.x -= 2;
            if (this.player.x < 0) this.player.x = 0;
        }
        if (this.controls.right && this.player.mode !== PlayerMode.Dead) {
            this.player.x += 2;
            if (this.player.x > SCREEN_WIDTH - 16) this.player.x = SCREEN_WIDTH - 16;
        }
        if (
            this.controls.fire &&
            this.player.mode === PlayerMode.Alive &&
            this.fireCountdown <= 0
        ) {
            if (this.turbo) {
                this.bullets.push(new Bullet(this.player.x, this.player.y));
                this.bullets.push(new Bullet(this.player.x + 13, this.player.y));
            } else {
                this.bullets.push(new Bullet(this.player.x + 7, this.player.y));
            }
            laserShoot.play();
            this.fireCountdown = 6;
        }

        this.fireCountdown--;
        if (!this.turbo) this.controls.fire = false;

        this.player.tick(this.tickCount);

        // Enemy logic
        this.enemies.forEach((enemy) => {
            enemy.tick(this.tickCount);
            if (enemy.fireCountdown === 0 && this.enemyBullets.length < 8) {
                this.enemyBullets.push(new Bullet(enemy.x + 3, enemy.y + 8, 2));
            }
            if (
                enemy.mode === EnemyMode.Dive &&
                this.player.isHit(enemy.x + 4, enemy.y + 4) &&
                this.player.kill(this.tickCount)
            ) {
                this.explodePlayer(this.player.x + 8, this.player.y + 4);
            }
        });
        this.enemies = this.enemies.filter((enemy) => enemy.isLive());

        // Bullets
        this.bullets.forEach((bullet) => {
            bullet.tick();
            const hit = this.enemies.find((enemy) => enemy.isHit(bullet.x, bullet.y));
            if (hit) {
                bullet.dead = true;
                this.enemies = this.enemies.filter((enemy) => enemy !== hit);
                this.explodeEnemy(hit.x + 4, hit.y + 4, hit.spriteX);
                this.player.score += 10;
                hitHurt.play();
            }
        });
        this.bullets = this.bullets.filter((bullet) => bullet.isLive());

        this.enemyBullets.forEach((bullet) => {
            bullet.tick();
            if (this.player.isHit(bullet.x, bullet.y) && this.player.kill(this.tickCount)) {
                bullet.dead = true;
                this.explodePlayer(this.player.x + 8, this.player.y + 4);
            }
        });
        this.enemyBullets = this.enemyBullets.filter((bullet) => bullet.isLive());

        // Explosion particles
        this.particles.forEach((particles) => particles.tick());
        this.particles = this.particles.filter((particle) => !particle.dead);
    }

    explodeEnemy(x: number, y: number, color: number) {
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

    explodePlayer(x: number, y: number) {
        for (let i = 0; i < 16; i++) {
            const angle = 2 * Math.PI * Math.random();
            const velocity = Math.random() / 2 + 1;
            this.particles.push(
                new Particle(
                    x + Math.random() * 2,
                    y + Math.random() * 2,
                    velocity * Math.cos(angle),
                    velocity * Math.sin(angle),
                    0
                )
            );
        }
    }
}

class Sprite {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number = 0, y: number = 0, width: number = 1, height: number = 1) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    isHit(x: number, y: number): boolean {
        return x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height;
    }
}

export enum PlayerMode {
    Alive,
    Dead,
    Iframe, // Invincible for a short time after spawning
}

class Player extends Sprite {
    lives: number = 5;
    mode: PlayerMode = PlayerMode.Alive;
    deathTickCount?: number;
    score: number = 0;

    constructor() {
        super(13 * 8, 33 * 8, 16, 8);
    }

    tick(tickCount: number) {
        const DEAD_TICKS = 60;
        const IFRAME_TICKS = 120;

        switch (this.mode) {
            case PlayerMode.Dead:
                if (this.deathTickCount! + DEAD_TICKS <= tickCount) this.mode = PlayerMode.Iframe;
                if (this.lives === 0) {
                    this.lives = 5;
                    this.score = 0;
                }
                break;
            case PlayerMode.Iframe:
                if (this.deathTickCount! + DEAD_TICKS + IFRAME_TICKS <= tickCount)
                    this.mode = PlayerMode.Alive;
                break;
        }
    }

    kill(tickCount: number) {
        if (this.mode !== PlayerMode.Alive) return false;

        this.mode = PlayerMode.Dead;
        this.lives--;
        this.deathTickCount = tickCount;
        explosion.play();
        return true;
    }
}

export enum EnemyMode {
    Waiting, // New enemy, waiting offscreen
    FlyIn, // Flying into formation
    Formation, // In formation on the screen
    Dive, // Diving towards the player
    Dead,
}

class Enemy extends Sprite {
    row: number;
    column: number;
    spriteY: number;
    spriteX: number;
    fireCountdown: number = 1;
    mode: EnemyMode = EnemyMode.Waiting;
    private targetY?: number;
    private targetX?: number;
    private startY?: number;
    private startX?: number;
    private startTickCount?: number;

    constructor(row: number, column: number, spriteY: number, spriteX: number) {
        super(SCREEEN_HEIGHT, SCREEN_WIDTH, ENEMY_SIZE, ENEMY_SIZE);
        this.row = row;
        this.column = column;
        this.spriteY = spriteY;
        this.spriteX = spriteX;
    }

    tick(tickCount: number) {
        const START_Y = 23 * ENEMY_SIZE;
        const FLY_IN_TICKS = 100;
        const DIVE_TICKS = 200;
        const P1 = {
            x: this.row % 2 === 0 ? -ENEMY_SIZE : SCREEN_WIDTH,
            y: ENEMY_SIZE * 4,
        };
        const P2 = {
            x: this.row % 2 === 0 ? SCREEN_WIDTH : 0,
            y: 0,
        };
        let t;

        if (this.mode !== EnemyMode.Waiting) {
            if ((this.fireCountdown ?? -1) < 0) {
                this.fireCountdown = Math.floor(Math.random() * 60 * 15) + 60 * 5;
            }

            this.fireCountdown--;
        }
        switch (this.mode) {
            case EnemyMode.Waiting:
                if (this.calculateY(tickCount) < START_Y) {
                    this.targetY = this.calculateY(
                        tickCount + FLY_IN_TICKS + this.column * ENEMY_SIZE
                    );
                    this.targetX = this.calculateX(
                        tickCount + FLY_IN_TICKS + this.column * ENEMY_SIZE
                    );
                    this.startTickCount = tickCount + this.column * ENEMY_SIZE;
                    this.mode = EnemyMode.FlyIn;
                }

                break;
            case EnemyMode.FlyIn:
                t = (tickCount - this.startTickCount!) / FLY_IN_TICKS;
                this.y = bezierAtTime(P1.y, P2.y, this.targetY!, t);
                this.x = bezierAtTime(P1.x, P2.x, this.targetX!, t);
                if (t >= 1) this.mode = EnemyMode.Formation;
                break;
            case EnemyMode.Formation:
                this.y = this.calculateY(tickCount);
                this.x = this.calculateX(tickCount);
                if (this.y - this.column <= ENEMY_SIZE) {
                    this.mode = EnemyMode.Dive;
                    this.startTickCount = tickCount;
                    this.startX = this.x;
                    this.startY = this.y;
                    this.targetX = Math.random() * SCREEN_WIDTH;
                    this.targetY = SCREEEN_HEIGHT;
                }
                break;
            case EnemyMode.Dive:
                t = (tickCount - this.startTickCount!) / DIVE_TICKS;
                this.y = bezierAtTime(this.startY!, P1.y, this.targetY!, t);
                this.x = bezierAtTime(this.startX!, P1.x, this.targetX!, t);
                if (t > 1) this.mode = EnemyMode.Dead;
                break;
        }
    }

    isHit(x: number, y: number): boolean {
        if (this.mode === EnemyMode.FlyIn) return false;

        return super.isHit(x, y);
    }

    calculateY(tickCount: number) {
        const slowedCount = Math.floor(tickCount / 16);
        return 20 * ENEMY_SIZE - slowedCount + 16 * this.row;
    }

    calculateX(tickCount: number) {
        const slowedCount = Math.floor(tickCount / 4);
        const remainder = slowedCount % 64;
        return (remainder < 32 ? remainder : 64 - remainder) - 16 + ENEMY_SIZE * this.column;
    }

    isLive() {
        return this.mode !== EnemyMode.Dead;
    }
}

class Bullet extends Sprite {
    dead: boolean = false;
    velocity: number;

    constructor(x: number, y: number, velocity: number = -5) {
        super(x, y);
        this.velocity = velocity;
    }

    tick() {
        this.y += this.velocity;
    }

    isLive() {
        return this.y > 0 && this.y < SCREEEN_HEIGHT && !this.dead;
    }
}

class Star extends Sprite {
    depth: number;

    constructor() {
        super(Math.floor(Math.random() * SCREEN_WIDTH), Math.floor(Math.random() * SCREEEN_HEIGHT));
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
        this.dead = this.x < 0 || this.x > SCREEN_WIDTH || this.y < 0 || this.y > SCREEEN_HEIGHT;
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

function* getEnemies(): Generator<Enemy[]> {
    const text = `My name is
*Andy ONeill*

*Space* to fire
< and > to move

I am a
software engineer

Check out my code
on *Github*

Find career info
on *LinkedIn*
or my *resume*

I enjoy
retro gaming
mechanical keyboards
*programming*
origami
`.toUpperCase();

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
        yield messageToEnemies(message, row);
    }

    for (let row = lines.length; true; row += 2) {
        if (row === lines.length + 4) {
            yield messageToEnemies([{ text: "ALL YOUR BASE", color: 0 }], row);
            yield messageToEnemies([{ text: "ARE BELONG TO US", color: 0 }], row + 1);
            continue;
        }
        if (row === lines.length + 20) {
            yield messageToEnemies([{ text: "ARE YOU", color: 0 }], row);
            yield messageToEnemies([{ text: "STILL HERE", color: 0 }], row + 1);
            continue;
        }
        let result = [];
        for (let i = 2; i < 24; i += 4) {
            result.push(new Enemy(row, i, 39, 0));
            result.push(new Enemy(row, i + 2, 39, 1));
        }
        yield result;
        result = [];
        for (let i = 3; i < 24; i += 4) {
            result.push(new Enemy(row + 1, i, 39, 0));
            result.push(new Enemy(row + 1, i + 2, 39, 1));
        }
        yield result;
    }
}

function messageToEnemies(message: MessageBlock[], row: number): Enemy[] {
    const result: Enemy[] = [];
    const totalLength = message.reduce((sum, mb) => sum + mb.text.length, 0);
    let i = Math.floor((COLUMNS - totalLength) / 2);
    for (const mb of message) {
        for (const letter of mb.text) {
            if (letter === " ") {
                i++;
                continue;
            }
            let color = mb.color;
            let y = letter.charCodeAt(0) - "A".charCodeAt(0);
            if (letter === "<") {
                color = 0;
                y = 26;
            }
            if (letter === ">") {
                color = 1;
                y = 26;
            }
            result.push(new Enemy(row, i, y, color));
            i++;
        }
    }
    return result;
}

function bezierAtTime(begin: number, control: number, end: number, t: number) {
    return (1 - t) ** 2 * begin + 2 * (1 - t) * t * control + t ** 2 * end;
}
