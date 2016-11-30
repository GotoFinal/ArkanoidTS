var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NoCollisionBody = (function (_super) {
    __extends(NoCollisionBody, _super);
    function NoCollisionBody() {
        _super.call(this, null);
    }
    NoCollisionBody.prototype.collideTestWithCircle = function (circle, fillResponse) {
        if (fillResponse === void 0) { fillResponse = true; }
        var response = new CollisionResponse();
        response.colliding = false;
        return response;
    };
    NoCollisionBody.prototype.collideTestWithPoint = function (point) {
        return false;
    };
    NoCollisionBody.prototype.collideTestWithPolygon = function (polygon, fillResponse) {
        if (fillResponse === void 0) { fillResponse = true; }
        var response = new CollisionResponse();
        response.colliding = false;
        return response;
    };
    Object.defineProperty(NoCollisionBody.prototype, "position", {
        get: function () {
            return new Vector(-1, -1);
        },
        enumerable: true,
        configurable: true
    });
    return NoCollisionBody;
}(CollisionBody));
//# sourceMappingURL=NoCollisionBody.js.map