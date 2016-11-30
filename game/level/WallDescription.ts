class WallDescription {
    size: Size;
    position: Vector;
    velocity: Vector;
    rotation: number;
    rotationVelocity: number;

    constructor(size: Size, position: SAT.Vector, velocity = new Vector(0, 0), rotation = 0, rotationVelocity = 0) {
        this.size = size;
        this.position = position;
        this.velocity = velocity;
        this.rotation = rotation;
        this.rotationVelocity = rotationVelocity;
    }

    construct(game: ArkanoidGame) {
        var constructed = new Wall(game, this.position, this.size);
        constructed.rotation = this.rotation;
        constructed.velocity = this.velocity;
        constructed.rotationVelocity = this.rotationVelocity;
        return constructed;
    }
}