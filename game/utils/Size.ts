class Size extends SAT.Vector {
    constructor(width: number, height: number) {
        super(width, height);
    }

    get width() {
        return this.x;
    }

    get height() {
        return this.y;
    }

    set width(width: number) {
        this.x = width;
    }

    set height(height: number) {
        this.y = height;
    }

    clone(): Size {
        return new Size(this.x, this.y);
    }
}