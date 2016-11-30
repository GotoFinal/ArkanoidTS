var Level = (function () {
    function Level(name) {
        this.bricks = [];
        this.players = [];
        this.walls = [];
        this._id = -1;
        this._name = name;
    }
    Object.defineProperty(Level.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Level.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return Level;
}());
//# sourceMappingURL=Level.js.map