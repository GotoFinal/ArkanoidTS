class PolygonCollisionBody extends CollisionBody<Polygon> {
    constructor(polygon: SAT.Polygon) {
        super(polygon);
    }

    collideTestWithCircle(circle: SAT.Circle, fillResponse = true): CollisionResponse {
        var response = new CollisionResponse();
        if (fillResponse) {
            response.colliding = SAT.testPolygonCircle(this.body, circle, response);
        } else {
            response.colliding = SAT.testPolygonCircle(this.body, circle);
        }
        return response;
    }

    collideTestWithPoint(point: SAT.Vector): boolean {
        return SAT.pointInPolygon(point, this.body);
    }

    collideTestWithPolygon(polygon: SAT.Polygon, fillResponse = true): CollisionResponse {
        var response = new CollisionResponse();
        if (fillResponse) {
            response.colliding = SAT.testPolygonPolygon(this.body, polygon, response);
        } else {
            response.colliding = SAT.testPolygonPolygon(this.body, polygon);
        }
        return response;
    }

    set rotation(rotation: number) {
        this._body.setAngle(rotation);
    }

    get rotation(): number {
        return this._body.angle;
    }

    set position(position: Vector) {
        this._body.pos = position;
    }

    get position(): Vector {
        return this._body.pos;
    }
}