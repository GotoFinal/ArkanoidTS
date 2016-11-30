var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Brick = (function (_super) {
    __extends(Brick, _super);
    function Brick(type, game, position) {
        _super.call(this, game, position, Brick.DEFAULT_SIZE.clone());
        this._type = type;
    }
    Brick.prototype.prepareSprite = function () {
        _super.prototype.prepareSprite.call(this);
        this.sprite.alpha = 0.7;
    };
    Object.defineProperty(Brick.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Brick.prototype.breakBrick = function (ball) {
        this.game.removeObject(this);
        this.onBreakBrick(ball, ball.lastPlayer);
    };
    Brick.prototype.defaultColor = function () {
        return 0xffffff;
    };
    Brick.prototype.defaultResource = function () {
        return PIXI.loader.resources['rectangle'];
    };
    Brick.DEFAULT_SIZE = new Size(70, 25);
    return Brick;
}(GameObject));
//# sourceMappingURL=Brick.js.map