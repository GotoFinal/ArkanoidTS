var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall(game, position, size) {
        if (position === void 0) { position = new Vector(0, 0); }
        if (size === void 0) { size = new Size(0, 0); }
        _super.call(this, game, position, size);
    }
    Wall.prototype.defaultColor = function () {
        return 0xf0f0f0;
    };
    Wall.prototype.defaultResource = function () {
        return PIXI.loader.resources['rectangle'];
    };
    return Wall;
}(GameObject));
//# sourceMappingURL=Wall.js.map