import Polygon = SAT.Polygon;
abstract class CollisionBody<T> {
    protected _body: T;

    constructor(body: T) {
        this._body = body;
    }

    get body(): T {
        return this._body;
    }

    set rotation(rotation: number) {

    }

    get rotation(): number {
        return 0;
    }

    set position(position: Vector) {

    }

    get position(): Vector {
        throw new TypeError("Invalid CollisionBody implementation.");
    }

    abstract collideTestWithCircle(circle: Circle, fillResponse? : boolean): CollisionResponse;

    abstract collideTestWithPoint(point: SAT.Vector): boolean;

    abstract collideTestWithPolygon(polygon: Polygon, fillResponse? : boolean): CollisionResponse;

    collideTestWithBox(box: Box, fillResponse = true): CollisionResponse {
        return this.collideTestWithPolygon(box.toPolygon());
    }

    collideTestWithCircleBody(circle: CircleCollisionBody, fillResponse = true): CollisionResponse {
        return this.collideTestWithCircle(circle._body);
    }

    collideTestWithPolygonBody(polygon: PolygonCollisionBody, fillResponse = true): CollisionResponse {
        return this.collideTestWithPolygon(polygon._body);
    }

    collideTestWithBody(body: CollisionBody<any>, fillResponse= true): CollisionResponse {
        var localBody = body._body;
        if (localBody instanceof Circle) {
            return this.collideTestWithCircle(localBody);
        }
        if (localBody instanceof Polygon) {
            return this.collideTestWithPolygon(localBody);
        }
        if (localBody instanceof Box) {
            return this.collideTestWithBox(localBody);
        }
        throw new TypeError("Unexpected type");
    }
}