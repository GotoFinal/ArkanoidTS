var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PolygonCollisionBody = (function (_super) {
    __extends(PolygonCollisionBody, _super);
    function PolygonCollisionBody(polygon) {
        _super.call(this, polygon);
    }
    PolygonCollisionBody.prototype.collideTestWithCircle = function (circle, fillResponse) {
        if (fillResponse === void 0) { fillResponse = true; }
        var response = new CollisionResponse();
        if (fillResponse) {
            response.colliding = SAT.testPolygonCircle(this.body, circle, response);
        }
        else {
            response.colliding = SAT.testPolygonCircle(this.body, circle);
        }
        return response;
    };
    PolygonCollisionBody.prototype.collideTestWithPoint = function (point) {
        return SAT.pointInPolygon(point, this.body);
    };
    PolygonCollisionBody.prototype.collideTestWithPolygon = function (polygon, fillResponse) {
        if (fillResponse === void 0) { fillResponse = true; }
        var response = new CollisionResponse();
        if (fillResponse) {
            response.colliding = SAT.testPolygonPolygon(this.body, polygon, response);
        }
        else {
            response.colliding = SAT.testPolygonPolygon(this.body, polygon);
        }
        return response;
    };
    Object.defineProperty(PolygonCollisionBody.prototype, "rotation", {
        get: function () {
            return this._body.angle;
        },
        set: function (rotation) {
            this._body.setAngle(rotation);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolygonCollisionBody.prototype, "position", {
        get: function () {
            return this._body.pos;
        },
        set: function (position) {
            this._body.pos = position;
        },
        enumerable: true,
        configurable: true
    });
    return PolygonCollisionBody;
}(CollisionBody));
//# sourceMappingURL=PolygonCollisionBody.js.map