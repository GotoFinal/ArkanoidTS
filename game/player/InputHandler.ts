class InputHandler {
    private _config: InputConfig;
    private isKeyLeftPressed = false;
    private isKeyUpPressed = false;
    private isKeyRightPressed = false;
    private isKeyDownPressed = false;
    private _action = false;

    constructor(config = InputConfig.createForArrows()) {
        this._config = config;
        window.addEventListener("keydown", (e) => this.onKeyDown(e), false);
        window.addEventListener("keyup", (e) => this.onKeyUp(e), false);
    }

    get action() {
        var cpy = this._action;
        this._action = false;
        return cpy;
    }

    get config(): InputConfig {
        return this._config;
    }

    set config(value: InputConfig) {
        this._config = value;
    }

    get keyAction(): number {
        return this._config.keyAction;
    }

    get keyLeft(): number {
        return this._config.keyLeft;
    }

    get keyUp(): number {
        return this._config.keyUp;
    }

    get keyRight(): number {
        return this._config.keyRight;
    }

    get keyDown(): number {
        return this._config.keyDown;
    }

    get inputVector(): SAT.Vector {
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
    }

    onKeyDown(e: KeyboardEvent) {
        var keyCode = e.keyCode;
        if (keyCode == this.keyLeft) {
            this.isKeyLeftPressed = true;
        } else if (keyCode == this.keyUp) {
            this.isKeyUpPressed = true;
        } else if (keyCode == this.keyRight) {
            this.isKeyRightPressed = true;
        } else if (keyCode == this.keyDown) {
            this.isKeyDownPressed = true;
        } else if (keyCode == this.keyAction) {
            this._action = true;
        }
    }

    onKeyUp(e: KeyboardEvent) {
        var keyCode = e.keyCode;
        if (keyCode == this.keyLeft) {
            this.isKeyLeftPressed = false;
        } else if (keyCode == this.keyUp) {
            this.isKeyUpPressed = false;
        } else if (keyCode == this.keyRight) {
            this.isKeyRightPressed = false;
        } else if (keyCode == this.keyDown) {
            this.isKeyDownPressed = false;
        }
    }
}