class PlayerDescription {
    position: Vector;
    size: Size;

    constructor(position : Vector, size = Player.DEFAULT_SIZE.clone()) {
        this.position = position;
        this.size = size;
    }

    construct(game: ArkanoidGame, id: number): Player {
        var player = new Player(game, this.position, this.size, game.settings.getInputConfig(id));
        return player;
    }
}