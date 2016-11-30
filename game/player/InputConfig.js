var InputConfig = (function () {
    function InputConfig(keyLeft, keyUp, keyRight, keyDown, keyAction) {
        this.keyLeft = keyLeft;
        this.keyUp = keyUp;
        this.keyRight = keyRight;
        this.keyDown = keyDown;
        this.keyAction = keyAction;
    }
    InputConfig.createForArrows = function () {
        return new InputConfig(37, 38, 39, 40, 32);
    };
    InputConfig.createForWSAD = function () {
        return new InputConfig(65, 87, 68, 83, 16);
    };
    InputConfig.createForNumpad = function () {
        return new InputConfig(100, 104, 102, 98, 13);
    };
    return InputConfig;
}());
//# sourceMappingURL=InputConfig.js.map