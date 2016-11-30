var Levels = (function () {
    // TODO: Loading from json, or something.
    function Levels() {
        this.levels = [];
        this.levelsMap = {};
        // temp code
        this.addLevel(Levels.createExample(1.0));
        this.addLevel(Levels.createExample(0.9));
        this.addLevel(Levels.createExample(0.8));
        this.addLevel(Levels.createExample(0.7));
        this.addLevel(Levels.createExample(0.6));
        this.addLevel(Levels.createExample(0.5));
        this.addLevel(Levels.createExample(0.4));
        this.addLevel(Levels.createExample(0.3));
        this.addLevel(Levels.createExample(0.2));
        this.addLevel(Levels.createExample(0.1));
        this.addLevel(Levels.createExample(0.0));
    }
    Levels.createExample = function (luck) {
        // temp code
        var example = new Level("Example " + luck);
        var bricksX = (1920 - Brick.DEFAULT_SIZE.width) / (Brick.DEFAULT_SIZE.width + 20);
        var bricksY = (984 * 0.75) / (Brick.DEFAULT_SIZE.height + 40);
        var defY = 20;
        var defX = 20;
        var current = new Vector(defX, defY);
        for (var x = 0; x < bricksX; x++) {
            for (var y = 0; y < bricksY; y++) {
                var brickDescription;
                if (Math.random() < luck) {
                    brickDescription = new BrickDescription(BrickType.BONUS_BRICK, Brick.DEFAULT_SIZE.clone(), current.clone());
                }
                else {
                    brickDescription = new BrickDescription(BrickType.BASIC_BRICK, Brick.DEFAULT_SIZE.clone(), current.clone());
                }
                example.bricks.push(brickDescription);
                current.y += (Brick.DEFAULT_SIZE.height + 40);
            }
            current.y = defY;
            current.x += (Brick.DEFAULT_SIZE.width + 20);
        }
        return example;
    };
    Levels.prototype.getNextLevel = function (id) {
        if (id < 0 || id >= this.levels.length) {
            return this.levels[0];
        }
        return this.levels[id + 1];
    };
    Levels.prototype.getLevelById = function (id) {
        return this.levels[id];
    };
    Levels.prototype.getLevelByName = function (id) {
        return this.levelsMap[id];
    };
    Levels.prototype.addLevel = function (level) {
        level['_id'] = this.levels.length;
        this.levels[level.id] = level;
        this.levelsMap[level.name] = level;
    };
    return Levels;
}());
//# sourceMappingURL=Levels.js.map