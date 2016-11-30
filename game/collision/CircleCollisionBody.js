var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Circle = SAT.Circle;
var CircleCollisionBody = (function (_super) {
    __extends(CircleCollisionBody, _super);
    function CircleCollisionBody(circle) {
        _super.call(this, circle);
    }
    CircleCollisionBody.prototype.collideTestWithCircle = function (circle, fillResponse) {
        if (fillResponse === void 0) { fillResponse = true; }
        var response = new CollisionResponse();
        if (fillResponse) {
            response.colliding = SAT.testCircleCircle(this.body, circle, response);
        }
        else {
            response.colliding = SAT.testCircleCircle(this.body, circle);
        }
        return response;
    };
    CircleCollisionBody.prototype.collideTestWithPoint = function (point) {
        return SAT.pointInCircle(point, this.body);
    };
    CircleCollisionBody.prototype.collideTestWithPolygon = function (polygon, fillResponse) {
        if (fillResponse === void 0) { fillResponse = true; }
        var response = new CollisionResponse();
        if (fillResponse) {
            response.colliding = SAT.testCirclePolygon(this.body, polygon, response);
        }
        else {
            response.colliding = SAT.testCirclePolygon(this.body, polygon);
        }
        return response;
    };
    Object.defineProperty(CircleCollisionBody.prototype, "position", {
        get: function () {
            return this._body.pos;
        },
        set: function (position) {
            this._body.pos = position;
        },
        enumerable: true,
        configurable: true
    });
    return CircleCollisionBody;
}(CollisionBody));
//# sourceMappingURL=CircleCollisionBody.js.map