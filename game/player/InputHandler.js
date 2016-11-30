var InputHandler = (function () {
    function InputHandler(config) {
        var _this = this;
        if (config === void 0) { config = InputConfig.createForArrows(); }
        this.isKeyLeftPressed = false;
        this.isKeyUpPressed = false;
        this.isKeyRightPressed = false;
        this.isKeyDownPressed = false;
        this._action = false;
        this._config = config;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); }, false);
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); }, false);
    }
    Object.defineProperty(InputHandler.prototype, "action", {
        get: function () {
            var cpy = this._action;
            this._action = false;
            return cpy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            this._config = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "keyAction", {
        get: function () {
            return this._config.keyAction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "keyLeft", {
        get: function () {
            return this._config.keyLeft;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "keyUp", {
        get: function () {
            return this._config.keyUp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "keyRight", {
        get: function () {
            return this._config.keyRight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "keyDown", {
        get: function () {
            return this._config.keyDown;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputHandler.prototype, "inputVector", {
        get: function () {
            var x = 0;
            var y = 0;
            if (this.isKeyLeftPressed) {
                --x;
            }
            if (this.isKeyUpPressed) {
                --y;
            }
            if (this.isKeyRightPressed) {
                ++x;
            }
            if (this.isKeyDownPressed) {
                ++y;
            }
            return new Vector(x, y);
        },
        enumerable: true,
        configurable: true
    });
    InputHandler.prototype.onKeyDown = function (e) {
        var keyCode = e.keyCode;
        if (keyCode == this.keyLeft) {
            this.isKeyLeftPressed = true;
        }
        else if (keyCode == this.keyUp) {
            this.isKeyUpPressed = true;
        }
        else if (keyCode == this.keyRight) {
            this.isKeyRightPressed = true;
        }
        else if (keyCode == this.keyDown) {
            this.isKeyDownPressed = true;
        }
        else if (keyCode == this.keyAction) {
            this._action = true;
        }
    };
    InputHandler.prototype.onKeyUp = function (e) {
        var keyCode = e.keyCode;
        if (keyCode == this.keyLeft) {
            this.isKeyLeftPressed = false;
        }
        else if (keyCode == this.keyUp) {
            this.isKeyUpPressed = false;
        }
        else if (keyCode == this.keyRight) {
            this.isKeyRightPressed = false;
        }
        else if (keyCode == this.keyDown) {
            this.isKeyDownPressed = false;
        }
    };
    return InputHandler;
}());
//# sourceMappingURL=InputHandler.js.map