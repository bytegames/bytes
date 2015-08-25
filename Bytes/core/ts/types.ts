namespace Bytes {

    export class GameDifficulty {

         static EASY: number = 300;
         static MEDIUM: number = 150;
         static DIFFICULT: number = 50;
    }

    export interface IGameObject {

        constructor;
        index;
        position;
        handleCollision(object: GameObject);
        draw();
    }

    export class GameObject implements IGameObject {

        index: number;
        position: Position;

        constructor(position?: Position) {

            position && (this.position = position);
        }

        handleCollision(object: GameObject) {

        }

        draw() {

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

    export enum Speed {
        SLOW,
        NORMAL,
        FAST
    }
}