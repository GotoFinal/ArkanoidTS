class Level {
    private _id: number;
    private _name: string;
    bricks: Array<BrickDescription> = [];
    players: Array<PlayerDescription> = [];
    walls: Array<WallDescription> = [];

    constructor(name: string) {
        this._id = -1;
        this._name = name;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }
}