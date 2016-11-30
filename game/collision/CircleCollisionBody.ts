import Circle = SAT.Circle;
class CircleCollisionBody extends CollisionBody<Circle> {
    constructor(circle: SAT.Circle) {
        super(circle);
    }

    collideTestWithCircle(circle: SAT.Circle, fillResponse = true): CollisionResponse {
        var response = new CollisionResponse();
        if (fillResponse) {
            response.colliding = SAT.testCircleCircle(this.body, circle, response);
        } else {
            response.colliding = SAT.testCircleCircle(this.body, circle);
        }
        return response;
    }

    collideTestWithPoint(point: SAT.Vector): boolean {
        return SAT.pointInCircle(point, this.body);
    }

    collideTestWithPolygon(polygon: SAT.Polygon, fillResponse = true): CollisionResponse {
        var response = new CollisionResponse();
        if (fillResponse) {
            response.colliding = SAT.testCirclePolygon(this.body, polygon, response);
        } else {
            response.colliding = SAT.testCirclePolygon(this.body, polygon);
        }
        return response;
    }

    set position(position: Vector) {
        this._body.pos = position;
    }

    get position(): Vector {
        return this._body.pos;
    }
}