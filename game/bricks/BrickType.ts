class BrickType<T extends Brick<T>> {
    private id_: number;
    private name_: string;
    private constructor_: BrickConstructor<T>;

    constructor(id: number, name: string, constructor: BrickConstructor<T>) {
        this.id_ = id;
        this.name_ = name;
        this.constructor_ = constructor;
    }

    get id(): number {
        return this.id_;
    }

    get name(): string {
        return this.name_;
    }

    construct(game: ArkanoidGame, position: Vector): T {
        return this.constructor_(game, position);
    }

    static BASIC_BRICK : BrickType<BasicBrick> = new BrickType<BasicBrick>(0, "Brick", (game, pos) => new BasicBrick(game, pos))
    static BONUS_BRICK : BrickType<BonusBrick> = new BrickType<BonusBrick>(0, "Bonus Brick", (game, pos) => new BonusBrick(game, pos))
}