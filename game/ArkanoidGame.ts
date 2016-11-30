import Container = PIXI.Container;
import Loader = PIXI.loaders.Loader;
import SystemRenderer = PIXI.SystemRenderer;
import Texture = PIXI.Texture;
import ITextStyle = PIXI.ITextStyle;

const WALL_SIZE = 50;

class ArkanoidGame {
    stage: Container;
    size: Size;
    ratio: number;
    loader: Loader;
    renderer: SystemRenderer;
    lasttime: number;
    background: Sprite;
    objects: Array<GameObject>;
    balls: Array<AbstractBall>;
    players: Array<Player>;
    walls: Array<Wall>;
    bricks: Array<Brick<any>>;
    counter: number;
    settings: Settings = new Settings();
    levels: Levels = new Levels();
    currentLevel: number = -1;
    lives: number = 3;

    lastDelta: number;
    private _pause: boolean = false;
    private _lose: boolean = false;

    livesTextStyle: ITextStyle = {
        fontFamily: "Arial",
        fontSize: "150px",
        fontStyle: "italic",
        fontWeight: "bold",
        fill: '#F7EDCA',
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    };
    // TODO?
    pointsTextStyle: ITextStyle = {
        fontFamily: "Arial",
        fontSize: "50px",
        fontStyle: "italic",
        fontWeight: "bold",
        fill: '#F7EDCA',
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    };

    static createGame() {
        window['arkanoid'] = new ArkanoidGame();
        window.addEventListener("blur", (ev) => {
            window['arkanoid'].pause();
        });
    }

    constructor() {
        this.size = new Size(1920, 984);
        this.ratio = this.size.width / this.size.height;
        this.stage = null;
        this.renderer = null;
        this.lasttime = null;
        this.objects = [];
        this.balls = [];
        this.players = [];
        this.bricks = [];
        this.walls = [];
        this.counter = 0;
    }

    displayLives() {
        var text: PIXI.Text = new PIXI.Text("" + this.lives, this.livesTextStyle);
        text.position.x = this.size.width / 2 - text.width / 2;
        text.position.y = this.size.height / 2 - text.height / 2;
        this.stage.addChild(text);
        setTimeout(() => {
            this.stage.removeChild(text);
        }, 2000);
    }

    isPaused(): boolean {
        return this._pause;
    }

    lose() {
        console.log("lose!");
        this.lives--;
        this.displayLives();
        if (this.lives > 0) {
            for (var player of this.players) {
                player.addNormalBall();
            }
            return;
        } else {
            this._pause = true;
            this._lose = true;
        }
    }

    pause() {
        this._pause = true;
    }

    unpause() {
        this._pause = false;
        if (this._lose) {
            this._lose = false;
            this.lives = 3;
            this.currentLevel = -1;
            this.nextLevel();
        }
    }

    preload() {
        this.createRenderer();

        this.loader = PIXI.loader;

        this.loader.add("background", "background.jpg");
        this.loader.add('rectangle', "rectangle.png");
        this.loader.add('ball', "ball.png");
        this.loader.once('complete', () => this.init());
        this.loader.load();
    }

    private cleanup(objects: Array<GameObject>) {
        for (var obj of objects) {
            obj.cleanup();
        }
    }

    reloadMap(level?: Level) {
        console.log("Start: " + level.id);
        this.counter = 0;
        this.cleanup(this.objects);
        this.cleanup(this.players);
        this.objects = [];
        this.balls = [];
        this.players = [];
        this.bricks = [];
        this.walls = [];

        // NOTE: is that needed?
        // basic walls:
        {
            this.addObject(new Wall(this)); // top
            this.addObject(new Wall(this)); // down
            this.addObject(new Wall(this)); // left
            this.addObject(new Wall(this)); // right
            this.updateWalls();
            // this.addObject(new Wall(this, new Vector(this.size.width / 2 - 200, this.size.height - 40), new Size(20, 40)));
        }
        if (level !== undefined) {
            if (level.players.length > 0) {
                var playerId = 0;
                for (var playerDesc of level.players) {
                    this.addObject(playerDesc.construct(this, playerId++));
                }
            } else {
                this.addObject(new Player(this));
            }
            for (var wallDesc of level.walls) {
                this.addObject(wallDesc.construct(this));
            }
            for (var brickDesc of level.bricks) {
                this.addObject(brickDesc.construct(this));
            }
        } else {
            this.addObject(new Player(this));
        }
    }

    removeObject(object: GameObject) {
        removeFromArray(object, this.objects);
        if (object instanceof Wall) {
            removeFromArray(object, this.walls);
        } else if (object instanceof Brick) {
            removeFromArray(object, this.bricks);
        } else if (object instanceof Player) {
            removeFromArray(object, this.players);
        } else if (object instanceof AbstractBall) {
            removeFromArray(object, this.balls);
        }
        object.cleanup();

        // TODO: move that to ball class?
        if (this.bricks.length == 0) {
            this.nextLevel();
        }
    }

    addObject(object: GameObject): any {
        object.prepareSprite();
        if (object instanceof Player) {
            this.players.push(object);
        } else {
            this.objects.push(object);
            if (object instanceof Wall) {
                this.walls.push(object);
            } else if (object instanceof Brick) {
                this.bricks.push(object);
            } else if (object instanceof AbstractBall) {
                this.balls.push(object);
            }
        }
        return object;
    }

    private createRenderer() {
        console.log("Create Renderer");

        var rendererOptions = {
            antialiasing: false,
            transparent: false,
            resolution: window.devicePixelRatio,
            autoResize: true
        };

        this.stage = new PIXI.Container();
        this.renderer = PIXI.autoDetectRenderer(this.size.width, this.size.height, rendererOptions);

        this.renderer.view.style.position = "absolute";
        this.renderer.view.style.top = "0px";
        this.renderer.view.style.left = "0px";

        document.body.appendChild(this.renderer.view);
        this.resize();
        window.addEventListener("resize", () => this.resize());

        // // Mod the title so it's easy to determine renderer on mobile
        // if (this.renderer instanceof PIXI.WebGLRenderer) {
        //     document.title += " (WebGL)";
        // } else {
        //     document.title += " (Canvas)";
        // }

    }

    updateWalls() {
        // top
        {
            var wall = this.walls[0];
            wall.position = new Vector(0, -WALL_SIZE + 5);
            wall.size = new Size(this.size.x, WALL_SIZE);
        }
        // down
        {
            var wall = this.walls[1];
            wall.position = new Vector(0, this.size.y);
            wall.size = new Size(this.size.x, WALL_SIZE);
        }
        // left
        {
            var wall = this.walls[2];
            wall.position = new Vector(-WALL_SIZE + 5, 0);
            wall.size = new Size(WALL_SIZE, this.size.height);
        }
        // right
        {
            var wall = this.walls[3];
            wall.position = new Vector(this.size.width - 5, 0);
            wall.size = new Size(WALL_SIZE, this.size.height);
        }
    }

    getRandomPlayer(): Player {
        if (this.players.length == 0) {
            return null;
        }
        if (this.players.length == 1) {
            return this.players[0];
        }
        return this.players[Math.floor(Math.random() * this.players.length)];
    }

    resetLevel() {
        var nextLevel = this.levels.getLevelById(this.currentLevel);
        this.reloadMap(nextLevel);
        for (var player of this.players) {
            player.addNormalBall();
        }
    }

    nextLevel() {
        var nextLevel = this.levels.getNextLevel(this.currentLevel);
        this.currentLevel = nextLevel.id;
        this.reloadMap(nextLevel);
        for (var player of this.players) {
            player.addNormalBall();
        }
    }

    init() {
        console.log("Init");
        this.background = new PIXI.Sprite(PIXI.loader.resources['background'].texture);
        this.background.width = this.size.width;
        this.background.height = this.size.height;

        this.stage.addChild(this.background);

        this.nextLevel();

        // Prepare for first frame of game loop/animation
        this.lasttime = new Date().getTime();
        requestAnimationFrame(() => this.animate());

    }

    resize() {
        var w, h;
        if (window.innerWidth / window.innerHeight >= this.ratio) {
            w = window.innerHeight * this.ratio;
            h = window.innerHeight;
        } else {
            w = window.innerWidth;
            h = window.innerWidth / this.ratio;
        }
        this.renderer.view.style.width = w + 'px';
        this.renderer.view.style.height = h + 'px';
    }

    animate() {
        // Determine seconds elapsed since last frame
        var currentTime = new Date().getTime();
        var delta = (currentTime - this.lasttime) / 1000;
        this.lastDelta = delta;

        if (this._pause) {
            var stop = false;
            // TODO: handle that separately to remove unnecessary looping?
            for (var player of this.players) {
                if (player.inputHandler.action) {
                    this.unpause();
                    stop = true;
                    break;
                }
            }
            if (!stop) {
                this.lasttime = new Date().getTime();
                requestAnimationFrame(() => this.animate());
                return;
            }
        }

        this.players.forEach(player => player.update(delta));
        this.objects.forEach(value => {
            value.update(delta);
            value.render();
        });
        this.players.forEach(player => player.render());
        // Draw the stage and prepare for the next frame
        this.renderer.render(this.stage);
        requestAnimationFrame(() => this.animate());
        this.lasttime = new Date().getTime();
    }
}