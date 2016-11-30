class BasicBrick extends Brick<BasicBrick> {
    constructor(game: ArkanoidGame, position: SAT.Vector) {
        super(BrickType.BASIC_BRICK, game, position);
    }

    onBreakBrick(ball: AbstractBall, player: Player) {
    }
}