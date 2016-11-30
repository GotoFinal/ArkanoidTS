class Player extends GameObject {
    static PLAYER_SPEED = 500;
    static MIN_HEIGHT_MULTI = 0.85;
    static DEFAULT_SIZE = new Size(100, 20);
    // static DEFAULT_SIZE = new Size(1900, 20);
    inputHandler: InputHandler;
    private velMulti = 1;
    private holdingBall: boolean = false;
    private balls: Array<AbstractBall> = [];

    constructor(game: ArkanoidGame, position = new Vector((game.size.width / 2) - (Player.DEFAULT_SIZE.x / 2), game.size.height - Player.DEFAULT_SIZE.y - 20), size = Player.DEFAULT_SIZE.clone(), inputConfig = InputConfig.createForArrows()) {
        super(game, position, size);
        this.inputHandler = new InputHandler(inputConfig);
    }

    protected positionUpdate(x: number, y: number, deltaX: number, deltaY: number, newX: number, newY: number): Vector {
        var maxX = this.game.size.x - this.size.x;
        var minX = 0;
        var maxY = this.game.size.y - this.size.y;
        var minY = this.game.size.y * Player.MIN_HEIGHT_MULTI;
        if (newX > maxX) {
            newX = maxX;
        }
        if (newX < minX) {
            newX = minX;
        }
        if (newY > maxY) {
            newY = maxY;
        }
        if (newY < minY) {
            newY = minY;
        }
        return new Vector(newX, newY);
    }

    protected positionChanged(x: number, y: number, deltaX: number, deltaY: number, newX: number, newY: number): Vector {
        for (var wall of this.game.walls) {
            if (this.collideTestWith(wall, false).colliding) {
                this.velMulti /= 2;
                return new Vector(x, y);
            }
        }
        this.velMulti = 1;
        return null;
    }

    defaultColor() {
        return 0xff0000;
    }

    prepareSprite() {
        super.prepareSprite();
    }

    addNormalBall(hold = true) {
        var position = this.position;
        var ball: Ball = this.game.addObject(new Ball(this.game, position));
        this.addBall(ball, hold);
    }

    addBall(ball: AbstractBall, hold = true) {
        ball.velocity = new Vector(0, 0);
        ball.lastPlayer = this;
        this.moveBall(ball);
        if (hold) {
            this.holdingBall = true;
            this.balls.push(ball);
        } else {
            ball.velocity = AbstractBall.scaleVelocity(this.randomBallVelocity());
        }
    }

    private releaseBalls() {
        for (var ball of this.balls) {
            ball.velocity = AbstractBall.scaleVelocity(this.randomBallVelocity());
        }
        this.balls = [];
        this.holdingBall = false;
    }

    private randomBallVelocity(): Vector {
        // return new Vector(0, 0.2);
        return new Vector((Math.random() + 0.2) * 2 - 1, -0.2)
    }

    private moveBall(ball: AbstractBall) {
        var position = this.position;
        position.x = position.x + this.sizeX / 2;
        position.y = position.y + this.sizeY / 2 - ball.sizeY - 1;
        ball.position = position;
    }

    private moveBalls() {
        for (var ball of this.balls) {
            this.moveBall(ball);
        }
    }

    action() {
        if (this.holdingBall) {
            this.releaseBalls();
            return;
        }
        // TODO: special actions.
    }

    update(delta: number) {
        super.update(delta);
        var scale = Player.PLAYER_SPEED * this.velMulti;
        this.velocity = this.inputHandler.inputVector.scale(scale, scale);
        if (this.holdingBall) {
            this.moveBalls();
        }
        if (this.inputHandler.action) {
            this.action();
        }
        // this.moveByVector(this.inputHandler.inputVector.clone().multipleByNumber(PLAYER_SPEED * delta));
        // console.log(this.inputHandler.inputVector);
    }
}