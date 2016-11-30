class BonusBrick extends Brick<BonusBrick> {
    constructor(game: ArkanoidGame, position: SAT.Vector) {
        super(BrickType.BASIC_BRICK, game, position);
    }

    defaultColor(): number {
        return 0x1f1f4f;
    }

    onBreakBrick(ball: AbstractBall, player: Player) {
        player.addNormalBall(false);
    }
}