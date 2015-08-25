namespace Bytes {
    
    export enum ClockType {
        TIMED,
        INFINITE
    }

    export enum ClockTick {
        EVEN,
        ODD
    }

    export class Timer {

        private handle: number;
        private interval: number;
        private duration: number;

        public type: ClockType;
        public tick: ClockTick = ClockTick.EVEN;
        public isRunning: boolean;
        public isPaused: boolean;

        private onElapsed: () => any = () => { console.log("No clock event") };
        private _onElapsed() {

            if (this.isPaused) {
                return;
            }
            
            this.tick = (this.tick === ClockTick.EVEN)
                ? ClockTick.ODD
                : ClockTick.EVEN;

            this.onElapsed();
            if (this.type == ClockType.TIMED) {
                this.stop();
            }
        }

        constructor(interval: number, duration: number, elaspedHandler: () => any) {

            this.interval = interval;
            this.duration = duration;
            this.onElapsed = elaspedHandler;
            this.type = (duration == 0) ? ClockType.INFINITE : ClockType.TIMED;
        }

        public start() {

            this.isRunning = true;
            this.handle = (this.type == ClockType.INFINITE)
                ? window.setInterval(this._onElapsed.bind(this), this.interval)
                : window.setTimeout(this._onElapsed.bind(this), this.interval);
        }

        public stop() {

            if (this.type == ClockType.INFINITE) {
                window.clearInterval(this.handle);
            }
            else {
                window.clearTimeout(this.handle);
            }

            this.isRunning = false;
        }

        public pause() {

            this.isPaused = true;
        }

        public resume() {
            
            this.isPaused = false;
        }                
    }
}