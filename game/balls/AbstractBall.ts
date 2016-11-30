import Vector = SAT.Vector;
abstract class AbstractBall extends GameObject {
    static BALL_SIZE = new Size(20, 20);
    static SPEED_MULTI = 1; // default = 1

    lastPlayer: Player;

    constructor(game: ArkanoidGame, position: Vector) {
        super(game, position, Ball.BALL_SIZE.clone());
    }

    defaultColor() {
        return 0x0000ff;
    }

    defaultResource() {
        return PIXI.loader.resources['ball'];
    }


    recreateBody(): CollisionBody<any> {
        return new CircleCollisionBody(new Circle(this.getRawPosition(), this.sizeX / 2));
    }

    render() {
        this.sprite.tint = this.color;
        this.sprite.position.x = this.x - this.sizeX / 2;
        this.sprite.position.y = this.y - this.sizeY / 2;
        this.sprite.width = this.sizeX;
        this.sprite.height = this.sizeY;
    }


    protected positionUpdate(x: number, y: number, deltaX: number, deltaY: number, newX: number, newY: number): SAT.Vector {
        return null;
    }

    protected positionChanged(x: number, y: number, deltaX: number, deltaY: number, newX: number, newY: number): Vector {
        if ((newY + this.sizeY) >= this.game.size.height) {
            this.game.removeObject(this);
            console.log("balls: "+this.game.balls.length);
            if (this.game.balls.length == 0) {
                this.game.lose();
            }
            return null;
        }
        for (var wall of this.game.walls) {
            var collisionResponse = this.collideTestWith(wall, true);
            if (collisionResponse.colliding) {
                this.collide(collisionResponse);
                return new Vector(x, y);
            }
        }
        for (var brick of this.game.bricks) {
            var collisionResponse = this.collideTestWith(brick, true);
            if (collisionResponse.colliding) {
                this.collide(collisionResponse);
                brick.breakBrick(this);
                return new Vector(x, y);
            }
        }

        // TODO: move ball collision code to player code
        for (var player of this.game.players) {
            var collisionResponse = this.collideTestWith(player, true);
            if (collisionResponse.colliding) {
                this.collide(collisionResponse); // TODO replace with something better, ball should go faster in X axis when bounced from some distance from center of player.
                this.lastPlayer = player;
                return new Vector(x, y);
            }
        }
        return null;
    }

    private collide(collisionResponse: CollisionResponse) {
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
    }

    static scaleVelocity(vel: Vector): Vector {
        vel.normalize();
        vel.scale(Player.PLAYER_SPEED * AbstractBall.SPEED_MULTI, Player.PLAYER_SPEED * AbstractBall.SPEED_MULTI);
        return vel;
    }

    private static randomMulti(negate = false): number {
        var random = ((Math.random() * 2) - 1) / 100;
        if (negate) {
            return -1 + random;
        }
        return 1 + random;
    }

    update(delta: number): void {
        super.update(delta);
        //noinspection JSSuspiciousNameCombination, just abs(x)
        if (Math.abs(this.velY) < 25) {
            var vel = this.velocity;
            vel.y *= 2;
            AbstractBall.scaleVelocity(vel);
            this.velocity = vel;
        }
    }
}