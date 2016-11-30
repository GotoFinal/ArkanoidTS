var BrickDescription = (function () {
    function BrickDescription(type, size, position, velocity, rotation, rotationVelocity) {
        if (velocity === void 0) { velocity = new Vector(0, 0); }
        if (rotation === void 0) { rotation = 0; }
        if (rotationVelocity === void 0) { rotationVelocity = 0; }
        this.type = type;
        this.size = size;
        this.position = position;
        this.velocity = velocity;
        this.rotation = rotation;
        this.rotationVelocity = rotationVelocity;
    }
    BrickDescription.prototype.construct = function (game) {
        var constructed = this.type.construct(game, this.position.clone());
        constructed.rotation = this.rotation;
        constructed.velocity = this.velocity;
        constructed.rotationVelocity = this.rotationVelocity;
        return constructed;
    };
    return BrickDescription;
}());
//# sourceMappingURL=BrickDescription.js.map