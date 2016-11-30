var BrickType = (function () {
    function BrickType(id, name, constructor) {
        this.id_ = id;
        this.name_ = name;
        this.constructor_ = constructor;
    }
    Object.defineProperty(BrickType.prototype, "id", {
        get: function () {
            return this.id_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrickType.prototype, "name", {
        get: function () {
            return this.name_;
        },
        enumerable: true,
        configurable: true
    });
    BrickType.prototype.construct = function (game, position) {
        return this.constructor_(game, position);
    };
    BrickType.BASIC_BRICK = new BrickType(0, "Brick", function (game, pos) { return new BasicBrick(game, pos); });
    BrickType.BONUS_BRICK = new BrickType(0, "Bonus Brick", function (game, pos) { return new BonusBrick(game, pos); });
    return BrickType;
}());
//# sourceMappingURL=BrickType.js.map