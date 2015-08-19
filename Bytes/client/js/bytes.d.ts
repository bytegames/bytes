declare module Bytes {
    class GameBoard {
        static backgroundColor: string;
        static gridColor: string;
        static blockSize: number;
        static height: any;
        static width: any;
        static grid: GameObject[][];
        static placeObject(object: GameObject, position: Position): void;
        static removeObjectAt(position: Position): void;
        static moveObject(object: GameObject, newPosition: Position): void;
        static placeAtRandom(object: GameObject): void;
        static moveToRandom(object: GameObject): void;
        static generateRandomPosition(): Position;
        static init(): void;
        static draw(): void;
    }
}
declare module Bytes {
    class Game {
        static htmlBody: HTMLBodyElement;
        static clock: Timer;
        static player1: Snake;
        static hiScore: number;
        static isRunning: boolean;
        static init(): void;
        static ready(): void;
        static start(): void;
        static togglePause(): void;
        static reset(): void;
        static coinCounter: number;
        static onClockTick(): void;
    }
}
declare module Bytes {
    class Canvas {
        static width: number;
        static height: number;
        static el: HTMLCanvasElement;
        static context: CanvasRenderingContext2D;
        static init(el: HTMLCanvasElement): void;
        static fill(color: string): void;
        static fillRect(x: number, y: number, w: number, h: number, color: string): void;
        static drawRect(x: number, y: number, w: number, h: number, color: string): void;
    }
}
declare module Bytes {
    class Buttons {
        static start: HTMLButtonElement;
        static pause: HTMLButtonElement;
        static reset: HTMLButtonElement;
        static init(): void;
    }
    class GUI {
        static header: HTMLElement;
        static lives: HTMLElement;
        static score: HTMLElement;
        static build: HTMLElement;
        static init(): void;
        static draw(): void;
    }
    class Controls {
        static init(): void;
        static onClickPlay(): void;
        static onClickPause(): void;
        static onClickReset(): void;
        static lastKeyPressed: number;
        static onKeyUp(ev: KeyboardEvent): void;
        static processInput(): void;
    }
}
declare module Bytes {
    interface IGameObject {
        constructor: any;
        position: any;
        handleCollision(object: GameObject): any;
        draw(): any;
    }
    class GameObject implements IGameObject {
        position: Position;
        constructor();
        handleCollision(object: GameObject): void;
        draw(): void;
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
    enum Speed {
        SLOW = 0,
        NORMAL = 1,
        FAST = 2,
    }
}
declare module Bytes {
    class SlowPlayerEvent extends GameEvent {
    }
    class SlowPlayer extends GameObject implements IGameObject {
        static instances: {
            [index: number]: Coin;
        };
        static itemsIndex: number;
        static itemsActive: number;
        index: number;
        color: string;
        constructor();
        handleCollision(snake: Snake): void;
        draw(): void;
        destroy(): void;
    }
    class FastPlayer extends GameObject implements IGameObject {
        static instances: {
            [index: number]: Coin;
        };
        static itemsIndex: number;
        static itemsActive: number;
        index: number;
        color: string;
        constructor();
        handleCollision(snake: Snake): void;
        draw(): void;
        destroy(): void;
    }
    class Coin extends GameObject implements IGameObject {
        static values: number[];
        static instances: {
            [index: number]: Coin;
        };
        static coinsIndex: number;
        static coinsActive: number;
        index: number;
        value: number;
        constructor(value: number);
        static generateRandom(): Coin;
        handleCollision(snake: Snake): void;
        draw(): void;
        destroy(): void;
    }
}
declare module Bytes {
    class SnakeSegment extends GameObject implements IGameObject {
        color: string;
        constructor(position: Position);
        draw(): void;
        handleCollision(snake: Snake): void;
    }
    class Snake extends SnakeSegment {
        direction: Direction;
        speed: Speed;
        skipNextTurn: boolean;
        hitDetected: boolean;
        isAlive: boolean;
        hiScore: number;
        points: number;
        lives: number;
        segments: SnakeSegment[];
        maxLength: number;
        constructor(position: Position);
        onHitScreenEdge(edge: ScreenEdge): void;
        die(): void;
        setSpeed(speed: Speed): void;
        processTurn(): void;
        private updateBoard(pos);
        private destroy();
    }
}
declare module Bytes {
    enum ClockType {
        TIMED = 0,
        INFINITE = 1,
    }
    enum ClockTick {
        EVEN = 0,
        ODD = 1,
    }
    class Timer {
        private handle;
        private interval;
        private duration;
        type: ClockType;
        tick: ClockTick;
        isRunning: boolean;
        isPaused: boolean;
        private onElapsed;
        private _onElapsed();
        constructor(interval: number, duration: number, elaspedHandler: () => any);
        start(): void;
        stop(): void;
        pause(): void;
        resume(): void;
    }
}
