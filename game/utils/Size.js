var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Size = (function (_super) {
    __extends(Size, _super);
    function Size(width, height) {
        _super.call(this, width, height);
    }
    Object.defineProperty(Size.prototype, "width", {
        get: function () {
            return this.x;
        },
        set: function (width) {
            this.x = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Size.prototype, "height", {
        get: function () {
            return this.y;
        },
        set: function (height) {
            this.y = height;
        },
        enumerable: true,
        configurable: true
    });
    Size.prototype.clone = function () {
        return new Size(this.x, this.y);
    };
    return Size;
}(SAT.Vector));
//# sourceMappingURL=Size.js.map