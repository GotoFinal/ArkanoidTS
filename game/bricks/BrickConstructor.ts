interface BrickConstructor<T extends Brick<T>> {
    (game: ArkanoidGame, position: Vector): T;
}