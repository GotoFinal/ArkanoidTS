var Polygon = SAT.Polygon;
var CollisionBody = (function () {
    function CollisionBody(body) {
        this._body = body;
    }
    Object.defineProperty(CollisionBody.prototype, "body", {
        get: function () {
            return this._body;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollisionBody.prototype, "rotation", {
        get: function () {
            return 0;
        },
        set: function (rotation) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollisionBody.prototype, "position", {
        get: function () {
            throw new TypeError("Invalid CollisionBody implementation.");
        },
        set: function (position) {
        },
        enumerable: true,
        configurable: true
    });
    CollisionBody.prototype.collideTestWithBox = function (box, fillResponse) {
        if (fillResponse === void 0) { fillResponse = true; }
        return this.collideTestWithPolygon(box.toPolygon());
    };
    CollisionBody.prototype.collideTestWithCircleBody = function (circle, fillResponse) {
        if (fillResponse === void 0) { fillResponse = true; }
        return this.collideTestWithCircle(circle._body);
    };
    CollisionBody.prototype.collideTestWithPolygonBody = function (polygon, fillResponse) {
        if (fillResponse === void 0) { fillResponse = true; }
        return this.collideTestWithPolygon(polygon._body);
    };
    CollisionBody.prototype.collideTestWithBody = function (body, fillResponse) {
        if (fillResponse === void 0) { fillResponse = true; }
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
    };
    return CollisionBody;
}());
//# sourceMappingURL=CollisionBody.js.map