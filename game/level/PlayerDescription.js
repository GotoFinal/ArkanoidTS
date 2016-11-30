var PlayerDescription = (function () {
    function PlayerDescription(position, size) {
        if (size === void 0) { size = Player.DEFAULT_SIZE.clone(); }
        this.position = position;
        this.size = size;
    }
    PlayerDescription.prototype.construct = function (game, id) {
        var player = new Player(game, this.position, this.size, game.settings.getInputConfig(id));
        return player;
    };
    return PlayerDescription;
}());
//# sourceMappingURL=PlayerDescription.js.map