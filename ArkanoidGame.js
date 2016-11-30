var Container = PIXI.Container;
var Loader = PIXI.loaders.Loader;
var SystemRenderer = PIXI.SystemRenderer;
var Texture = PIXI.Texture;
var WALL_SIZE = 50;
var ArkanoidGame = (function () {
    function ArkanoidGame() {
        this.settings = new Settings();
        this.levels = new Levels();
        this.currentLevel = -1;
        this.lives = 3;
        this._pause = false;
        this._lose = false;
        this.livesTextStyle = {
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
        this.pointsTextStyle = {
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
    ArkanoidGame.createGame = function () {
        window['arkanoid'] = new ArkanoidGame();
        window.addEventListener("blur", function (ev) {
            window['arkanoid'].pause();
        });
    };
    ArkanoidGame.prototype.displayLives = function () {
        var _this = this;
        var text = new PIXI.Text("" + this.lives, this.livesTextStyle);
        text.position.x = this.size.width / 2 - text.width / 2;
        text.position.y = this.size.height / 2 - text.height / 2;
        this.stage.addChild(text);
        setTimeout(function () {
            _this.stage.removeChild(text);
        }, 2000);
    };
    ArkanoidGame.prototype.isPaused = function () {
        return this._pause;
    };
    ArkanoidGame.prototype.lose = function () {
        console.log("lose!");
        this.lives--;
        this.displayLives();
        if (this.lives > 0) {
            for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
                var player = _a[_i];
                player.addNormalBall();
            }
            return;
        }
        else {
            this._pause = true;
            this._lose = true;
        }
    };
    ArkanoidGame.prototype.pause = function () {
        this._pause = true;
    };
    ArkanoidGame.prototype.unpause = function () {
        this._pause = false;
        if (this._lose) {
            this._lose = false;
            this.lives = 3;
            this.currentLevel = -1;
            this.nextLevel();
        }
    };
    ArkanoidGame.prototype.preload = function () {
        var _this = this;
        this.createRenderer();
        this.loader = PIXI.loader;
        this.loader.add("background", "background.jpg");
        this.loader.add('rectangle', "rectangle.png");
        this.loader.add('ball', "ball.png");
        this.loader.once('complete', function () { return _this.init(); });
        this.loader.load();
    };
    ArkanoidGame.prototype.cleanup = function (objects) {
        for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
            var obj = objects_1[_i];
            obj.cleanup();
        }
    };
    ArkanoidGame.prototype.reloadMap = function (level) {
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
        }
        if (level !== undefined) {
            if (level.players.length > 0) {
                var playerId = 0;
                for (var _i = 0, _a = level.players; _i < _a.length; _i++) {
                    var playerDesc = _a[_i];
                    this.addObject(playerDesc.construct(this, playerId++));
                }
            }
            else {
                this.addObject(new Player(this));
            }
            for (var _b = 0, _c = level.walls; _b < _c.length; _b++) {
                var wallDesc = _c[_b];
                this.addObject(wallDesc.construct(this));
            }
            for (var _d = 0, _e = level.bricks; _d < _e.length; _d++) {
                var brickDesc = _e[_d];
                this.addObject(brickDesc.construct(this));
            }
        }
        else {
            this.addObject(new Player(this));
        }
    };
    ArkanoidGame.prototype.removeObject = function (object) {
        removeFromArray(object, this.objects);
        if (object instanceof Wall) {
            removeFromArray(object, this.walls);
        }
        else if (object instanceof Brick) {
            removeFromArray(object, this.bricks);
        }
        else if (object instanceof Player) {
            removeFromArray(object, this.players);
        }
        else if (object instanceof AbstractBall) {
            removeFromArray(object, this.balls);
        }
        object.cleanup();
        // TODO: move that to ball class?
        if (this.bricks.length == 0) {
            this.nextLevel();
        }
    };
    ArkanoidGame.prototype.addObject = function (object) {
        object.prepareSprite();
        if (object instanceof Player) {
            this.players.push(object);
        }
        else {
            this.objects.push(object);
            if (object instanceof Wall) {
                this.walls.push(object);
            }
            else if (object instanceof Brick) {
                this.bricks.push(object);
            }
            else if (object instanceof AbstractBall) {
                this.balls.push(object);
            }
        }
        return object;
    };
    ArkanoidGame.prototype.createRenderer = function () {
        var _this = this;
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
        window.addEventListener("resize", function () { return _this.resize(); });
        // // Mod the title so it's easy to determine renderer on mobile
        // if (this.renderer instanceof PIXI.WebGLRenderer) {
        //     document.title += " (WebGL)";
        // } else {
        //     document.title += " (Canvas)";
        // }
    };
    ArkanoidGame.prototype.updateWalls = function () {
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
    };
    ArkanoidGame.prototype.getRandomPlayer = function () {
        if (this.players.length == 0) {
            return null;
        }
        if (this.players.length == 1) {
            return this.players[0];
        }
        return this.players[Math.floor(Math.random() * this.players.length)];
    };
    ArkanoidGame.prototype.resetLevel = function () {
        var nextLevel = this.levels.getLevelById(this.currentLevel);
        this.reloadMap(nextLevel);
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            player.addNormalBall();
        }
    };
    ArkanoidGame.prototype.nextLevel = function () {
        var nextLevel = this.levels.getNextLevel(this.currentLevel);
        this.currentLevel = nextLevel.id;
        this.reloadMap(nextLevel);
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            player.addNormalBall();
        }
    };
    ArkanoidGame.prototype.init = function () {
        var _this = this;
        console.log("Init");
        this.background = new PIXI.Sprite(PIXI.loader.resources['background'].texture);
        this.background.width = this.size.width;
        this.background.height = this.size.height;
        this.stage.addChild(this.background);
        this.nextLevel();
        // Prepare for first frame of game loop/animation
        this.lasttime = new Date().getTime();
        requestAnimationFrame(function () { return _this.animate(); });
    };
    ArkanoidGame.prototype.resize = function () {
        var w, h;
        if (window.innerWidth / window.innerHeight >= this.ratio) {
            w = window.innerHeight * this.ratio;
            h = window.innerHeight;
        }
        else {
            w = window.innerWidth;
            h = window.innerWidth / this.ratio;
        }
        this.renderer.view.style.width = w + 'px';
        this.renderer.view.style.height = h + 'px';
    };
    ArkanoidGame.prototype.animate = function () {
        var _this = this;
        // Determine seconds elapsed since last frame
        var currentTime = new Date().getTime();
        var delta = (currentTime - this.lasttime) / 1000;
        this.lastDelta = delta;
        if (this._pause) {
            var stop = false;
            // TODO: handle that separately to remove unnecessary looping?
            for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
                var player = _a[_i];
                if (player.inputHandler.action) {
                    this.unpause();
                    stop = true;
                    break;
                }
            }
            if (!stop) {
                this.lasttime = new Date().getTime();
                requestAnimationFrame(function () { return _this.animate(); });
                return;
            }
        }
        this.players.forEach(function (player) { return player.update(delta); });
        this.objects.forEach(function (value) {
            value.update(delta);
            value.render();
        });
        this.players.forEach(function (player) { return player.render(); });
        // Draw the stage and prepare for the next frame
        this.renderer.render(this.stage);
        requestAnimationFrame(function () { return _this.animate(); });
        this.lasttime = new Date().getTime();
    };
    return ArkanoidGame;
}());
//# sourceMappingURL=ArkanoidGame.js.map