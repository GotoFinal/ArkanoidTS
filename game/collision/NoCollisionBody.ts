class NoCollisionBody extends CollisionBody<void> {
    constructor() {
        super(null);
    }

    collideTestWithCircle(circle: SAT.Circle, fillResponse = true): CollisionResponse {
        var response = new CollisionResponse();
        response.colliding = false;
        return response;
    }

    collideTestWithPoint(point: SAT.Vector): boolean {
        return false;
    }

    collideTestWithPolygon(polygon: SAT.Polygon, fillResponse = true): CollisionResponse {
        var response = new CollisionResponse();
        response.colliding = false;
        return response;
    }

    get position(): Vector {
        return new Vector(-1, -1);
    }
}