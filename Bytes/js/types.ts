module Bytes {

    export class GameObject {

        position: Position;

        constructor() {

        }
    }

    export class GameEvent {

        constructor() {

        }
    }

    export enum ScreenEdge {
        NORTH,
        SOUTH,
        EAST,
        WEST
    }    

    export enum Direction {

        UP,
        DOWN,
        LEFT,
        RIGHT,
        NONE
    }

    export class Position {

        X: number;
        Y: number;

        constructor(x: number, y: number) {

            this.X = x;
            this.Y = y;
        }

        static copy(position: Position) {

            return new Position(position.X, position.Y);
        }
    }    
}