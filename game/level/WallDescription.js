var WallDescription = (function () {
    function WallDescription(size, position, velocity, rotation, rotationVelocity) {
        if (velocity === void 0) { velocity = new Vector(0, 0); }
        if (rotation === void 0) { rotation = 0; }
        if (rotationVelocity === void 0) { rotationVelocity = 0; }
        this.size = size;
        this.position = position;
        this.velocity = velocity;
        this.rotation = rotation;
        this.rotationVelocity = rotationVelocity;
    }
    WallDescription.prototype.construct = function (game) {
        var constructed = new Wall(game, this.position, this.size);
        constructed.rotation = this.rotation;
        constructed.velocity = this.velocity;
        constructed.rotationVelocity = this.rotationVelocity;
        return constructed;
    };
    return WallDescription;
}());
//# sourceMappingURL=WallDescription.js.map