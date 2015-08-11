declare module Bytes {
    class SnakeSegment extends GameObject {
        color: string;
        position: Position;
        constructor(position: Position);
        draw(): void;
    }
    class Snake extends SnakeSegment {
        direction: Direction;
        hitDetected: boolean;
        isAlive: boolean;
        lives: number;
        segments: SnakeSegment[];
        maxLength: number;
        constructor(position: Position);
        onHitScreenEdge(edge: ScreenEdge): void;
        die(): void;
        processTurn(): void;
        private updateBoard(pos);
        private destroy();
    }
}
