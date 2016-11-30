var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BonusBrick = (function (_super) {
    __extends(BonusBrick, _super);
    function BonusBrick(game, position) {
        _super.call(this, BrickType.BASIC_BRICK, game, position);
    }
    BonusBrick.prototype.defaultColor = function () {
        return 0x1f1f4f;
    };
    BonusBrick.prototype.onBreakBrick = function (ball, player) {
        player.addNormalBall(false);
    };
    return BonusBrick;
}(Brick));
//# sourceMappingURL=BonusBrick.js.map