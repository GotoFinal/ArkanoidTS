var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BasicBrick = (function (_super) {
    __extends(BasicBrick, _super);
    function BasicBrick(game, position) {
        _super.call(this, BrickType.BASIC_BRICK, game, position);
    }
    BasicBrick.prototype.onBreakBrick = function (ball, player) {
    };
    return BasicBrick;
}(Brick));
//# sourceMappingURL=BasicBrick.js.map