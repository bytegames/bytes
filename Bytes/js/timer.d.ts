declare module Bytes {
    enum ClockType {
        TIMED = 0,
        INFINITE = 1,
    }
    class Timer {
        private handle;
        private interval;
        private duration;
        private type;
        private isRunning;
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
