declare module Bytes {
    class GameObject {
        position: Position;
        constructor();
    }
    class GameEvent {
        constructor();
    }
    enum ScreenEdge {
        NORTH = 0,
        SOUTH = 1,
        EAST = 2,
        WEST = 3,
    }
    enum Direction {
        UP = 0,
        DOWN = 1,
        LEFT = 2,
        RIGHT = 3,
        NONE = 4,
    }
    class Position {
        X: number;
        Y: number;
        constructor(x: number, y: number);
        static copy(position: Position): Position;
    }
}
