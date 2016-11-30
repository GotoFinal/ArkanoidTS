import Response = SAT.Response;
class CollisionResponse extends Response {
    colliding: boolean;

    constructor() {
        super();
        this.colliding = false;
    }
}