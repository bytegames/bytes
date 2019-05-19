export class Position {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }
    static copy(position) {
        return new Position(position.X, position.Y);
    }
}
