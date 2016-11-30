class Wall extends GameObject {
    constructor(game: ArkanoidGame, position = new Vector(0, 0), size = new Size(0, 0)) {
        super(game, position, size);
    }

    defaultColor() {
        return 0xf0f0f0;
    }

    defaultResource() {
        return PIXI.loader.resources['rectangle'];
    }
}