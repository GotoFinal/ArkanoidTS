class BrickDescription {
    type: BrickType<any>;
    size: Size;
    position: Vector;
    velocity: Vector;
    rotation: number;
    rotationVelocity: number;

    constructor(type: BrickType<any>, size: Size, position: SAT.Vector, velocity = new Vector(0, 0), rotation = 0, rotationVelocity = 0) {
        this.type = type;
        this.size = size;
        this.position = position;
        this.velocity = velocity;
        this.rotation = rotation;
        this.rotationVelocity = rotationVelocity;
    }

    construct(game: ArkanoidGame): Brick<any> {
        var constructed = this.type.construct(game, this.position.clone());
        constructed.rotation = this.rotation;
        constructed.velocity = this.velocity;
        constructed.rotationVelocity = this.rotationVelocity;
        return constructed;
    }
}