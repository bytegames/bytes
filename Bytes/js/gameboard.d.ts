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
        static draw(): void;
        static init(): void;
    }
}
