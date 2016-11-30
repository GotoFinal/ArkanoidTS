class Settings {
    private inputConfigs: Array<InputConfig> = [];

    constructor() {
        this.inputConfigs[0] = InputConfig.createForArrows();
        this.inputConfigs[1] = InputConfig.createForWSAD();
        this.inputConfigs[2] = InputConfig.createForNumpad();
    }

    getInputConfig(playerId: number) {
        if (playerId >= this.inputConfigs.length) {
            // TODO: display some windows to config new input settings?
            return InputConfig.createForArrows();
        }
        return this.inputConfigs[playerId];
    }
}