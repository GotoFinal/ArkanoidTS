var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Vector = SAT.Vector;
var AbstractBall = (function (_super) {
    __extends(AbstractBall, _super);
    function AbstractBall(game, position) {
        _super.call(this, game, position, Ball.BALL_SIZE.clone());
    }
    AbstractBall.prototype.defaultColor = function () {
        return 0x0000ff;
    };
    AbstractBall.prototype.defaultResource = function () {
        return PIXI.loader.resources['ball'];
    };
    AbstractBall.prototype.recreateBody = function () {
        return new CircleCollisionBody(new Circle(this.getRawPosition(), this.sizeX / 2));
    };
    AbstractBall.prototype.render = function () {
        this.sprite.tint = this.color;
        this.sprite.position.x = this.x - this.sizeX / 2;
        this.sprite.position.y = this.y - this.sizeY / 2;
        this.sprite.width = this.sizeX;
        this.sprite.height = this.sizeY;
    };
    AbstractBall.prototype.positionUpdate = function (x, y, deltaX, deltaY, newX, newY) {
        return null;
    };
    AbstractBall.prototype.positionChanged = function (x, y, deltaX, deltaY, newX, newY) {
        if ((newY + this.sizeY) >= this.game.size.height) {
            this.game.removeObject(this);
            console.log("balls: " + this.game.balls.length);
            if (this.game.balls.length == 0) {
                this.game.lose();
            }
            return null;
        }
        for (var _i = 0, _a = this.game.walls; _i < _a.length; _i++) {
            var wall = _a[_i];
            var collisionResponse = this.collideTestWith(wall, true);
            if (collisionResponse.colliding) {
                this.collide(collisionResponse);
                return new Vector(x, y);
            }
        }
        for (var _b = 0, _c = this.game.bricks; _b < _c.length; _b++) {
            var brick = _c[_b];
            var collisionResponse = this.collideTestWith(brick, true);
            if (collisionResponse.colliding) {
                this.collide(collisionResponse);
                brick.breakBrick(this);
                return new Vector(x, y);
            }
        }
        // TODO: move ball collision code to player code
        for (var _d = 0, _e = this.game.players; _d < _e.length; _d++) {
            var player = _e[_d];
            var collisionResponse = this.collideTestWith(player, true);
            if (collisionResponse.colliding) {
                this.collide(collisionResponse); // TODO replace with something better, ball should go faster in X axis when bounced from some distance from center of player.
                this.lastPlayer = player;
                return new Vector(x, y);
            }
        }
        return null;
    };
    AbstractBall.prototype.collide = function (collisionResponse) {
        var vel = this.velocity;
        if (collisionResponse.overlapN.x != 0) {
            vel.scale(AbstractBall.randomMulti(true) * Math.abs(collisionResponse.overlapN.x), AbstractBall.randomMulti());
        }
        if (collisionResponse.overlapN.y != 0) {
            //noinspection JSSuspiciousNameCombination, just abs(x)
            vel.scale(AbstractBall.randomMulti(), AbstractBall.randomMulti(true) * Math.abs(collisionResponse.overlapN.y));
        }
        AbstractBall.scaleVelocity(vel);
        this.velocity = vel;
    };
    AbstractBall.scaleVelocity = function (vel) {
        vel.normalize();
        vel.scale(Player.PLAYER_SPEED * AbstractBall.SPEED_MULTI, Player.PLAYER_SPEED * AbstractBall.SPEED_MULTI);
        return vel;
    };
    AbstractBall.randomMulti = function (negate) {
        if (negate === void 0) { negate = false; }
        var random = ((Math.random() * 2) - 1) / 100;
        if (negate) {
            return -1 + random;
        }
        return 1 + random;
    };
    AbstractBall.prototype.update = function (delta) {
        _super.prototype.update.call(this, delta);
        //noinspection JSSuspiciousNameCombination, just abs(x)
        if (Math.abs(this.velY) < 25) {
            var vel = this.velocity;
            vel.y *= 2;
            AbstractBall.scaleVelocity(vel);
            this.velocity = vel;
        }
    };
    AbstractBall.BALL_SIZE = new Size(20, 20);
    AbstractBall.SPEED_MULTI = 1; // default = 1
    return AbstractBall;
}(GameObject));
//# sourceMappingURL=AbstractBall.js.map