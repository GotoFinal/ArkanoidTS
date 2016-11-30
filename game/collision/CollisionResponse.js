var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Response = SAT.Response;
var CollisionResponse = (function (_super) {
    __extends(CollisionResponse, _super);
    function CollisionResponse() {
        _super.call(this);
        this.colliding = false;
    }
    return CollisionResponse;
}(Response));
//# sourceMappingURL=CollisionResponse.js.map