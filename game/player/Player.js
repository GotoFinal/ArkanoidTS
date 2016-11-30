var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(game, position, size, inputConfig) {
        if (position === void 0) { position = new Vector((game.size.width / 2) - (Player.DEFAULT_SIZE.x / 2), game.size.height - Player.DEFAULT_SIZE.y - 20); }
        if (size === void 0) { size = Player.DEFAULT_SIZE.clone(); }
        if (inputConfig === void 0) { inputConfig = InputConfig.createForArrows(); }
        _super.call(this, game, position, size);
        this.velMulti = 1;
        this.holdingBall = false;
        this.balls = [];
        this.inputHandler = new InputHandler(inputConfig);
    }
    Player.prototype.positionUpdate = function (x, y, deltaX, deltaY, newX, newY) {
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
    };
    Player.prototype.positionChanged = function (x, y, deltaX, deltaY, newX, newY) {
        for (var _i = 0, _a = this.game.walls; _i < _a.length; _i++) {
            var wall = _a[_i];
            if (this.collideTestWith(wall, false).colliding) {
                this.velMulti /= 2;
                return new Vector(x, y);
            }
        }
        this.velMulti = 1;
        return null;
    };
    Player.prototype.defaultColor = function () {
        return 0xff0000;
    };
    Player.prototype.prepareSprite = function () {
        _super.prototype.prepareSprite.call(this);
    };
    Player.prototype.addNormalBall = function (hold) {
        if (hold === void 0) { hold = true; }
        var position = this.position;
        var ball = this.game.addObject(new Ball(this.game, position));
        this.addBall(ball, hold);
    };
    Player.prototype.addBall = function (ball, hold) {
        if (hold === void 0) { hold = true; }
        ball.velocity = new Vector(0, 0);
        ball.lastPlayer = this;
        this.moveBall(ball);
        if (hold) {
            this.holdingBall = true;
            this.balls.push(ball);
        }
        else {
            ball.velocity = AbstractBall.scaleVelocity(this.randomBallVelocity());
        }
    };
    Player.prototype.releaseBalls = function () {
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            ball.velocity = AbstractBall.scaleVelocity(this.randomBallVelocity());
        }
        this.balls = [];
        this.holdingBall = false;
    };
    Player.prototype.randomBallVelocity = function () {
        // return new Vector(0, 0.2);
        return new Vector((Math.random() + 0.2) * 2 - 1, -0.2);
    };
    Player.prototype.moveBall = function (ball) {
        var position = this.position;
        position.x = position.x + this.sizeX / 2;
        position.y = position.y + this.sizeY / 2 - ball.sizeY - 1;
        ball.position = position;
    };
    Player.prototype.moveBalls = function () {
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            this.moveBall(ball);
        }
    };
    Player.prototype.action = function () {
        if (this.holdingBall) {
            this.releaseBalls();
            return;
        }
        // TODO: special actions.
    };
    Player.prototype.update = function (delta) {
        _super.prototype.update.call(this, delta);
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
    };
    Player.PLAYER_SPEED = 500;
    Player.MIN_HEIGHT_MULTI = 0.85;
    Player.DEFAULT_SIZE = new Size(100, 20);
    return Player;
}(GameObject));
//# sourceMappingURL=Player.js.map