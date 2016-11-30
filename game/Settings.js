var Settings = (function () {
    function Settings() {
        this.inputConfigs = [];
        this.inputConfigs[0] = InputConfig.createForArrows();
        this.inputConfigs[1] = InputConfig.createForWSAD();
        this.inputConfigs[2] = InputConfig.createForNumpad();
    }
    Settings.prototype.getInputConfig = function (playerId) {
        if (playerId >= this.inputConfigs.length) {
            // TODO: display some windows to config new input settings?
            return InputConfig.createForArrows();
        }
        return this.inputConfigs[playerId];
    };
    return Settings;
}());
//# sourceMappingURL=Settings.js.map