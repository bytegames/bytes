declare module Bytes {
    class Game {
        static htmlBody: HTMLBodyElement;
        static clock: Timer;
        static player1: Snake;
        static isRunning: boolean;
        constructor();
        static start(): void;
        static pause(): void;
        static reset(): void;
        static processTurn(): void;
    }
}
