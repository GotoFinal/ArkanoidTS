class InputConfig {
    keyLeft: number;
    keyUp: number;
    keyRight: number;
    keyDown: number;
    keyAction: number;

    constructor(keyLeft, keyUp, keyRight, keyDown, keyAction) {
        this.keyLeft = keyLeft;
        this.keyUp = keyUp;
        this.keyRight = keyRight;
        this.keyDown = keyDown;
        this.keyAction = keyAction;
    }

    static createForArrows(): InputConfig {
        return new InputConfig(37, 38, 39, 40, 32);
    }

    static createForWSAD(): InputConfig {
        return new InputConfig(65, 87, 68, 83, 16);
    }

    static createForNumpad(): InputConfig {
        return new InputConfig(100, 104, 102, 98, 13);
    }
}