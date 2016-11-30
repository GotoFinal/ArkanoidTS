abstract class Brick<T extends Brick<T>> extends GameObject {
    static DEFAULT_SIZE = new Size(70, 25);

    private _type: BrickType<T>;

    constructor(type: BrickType<T>, game: ArkanoidGame, position: Vector) {
        super(game, position, Brick.DEFAULT_SIZE.clone());
        this._type = type;
    }

    prepareSprite(): void {
        super.prepareSprite();
        this.sprite.alpha = 0.7;
    }

    get type(): BrickType<T> {
        return this._type;
    }

    breakBrick(ball: AbstractBall) {
        this.game.removeObject(this);
        this.onBreakBrick(ball, ball.lastPlayer);
    }

    abstract onBreakBrick(ball: AbstractBall, player: Player);

    defaultColor() {
        return 0xffffff;
    }

    defaultResource() {
        return PIXI.loader.resources['rectangle'];
    }
}