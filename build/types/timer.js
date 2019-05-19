export var ClockType;
(function (ClockType) {
    ClockType[ClockType["TIMED"] = 0] = "TIMED";
    ClockType[ClockType["INFINITE"] = 1] = "INFINITE";
})(ClockType || (ClockType = {}));
export var ClockTick;
(function (ClockTick) {
    ClockTick[ClockTick["EVEN"] = 0] = "EVEN";
    ClockTick[ClockTick["ODD"] = 1] = "ODD";
})(ClockTick || (ClockTick = {}));
export class Timer {
    constructor(interval, duration, handler) {
        this.tick = ClockTick.EVEN;
        this.handler = () => { console.log("No clock event"); };
        this.on_elapsed = () => {
            if (this.is_paused) {
                return;
            }
            this.tick = (this.tick === ClockTick.EVEN)
                ? ClockTick.ODD
                : ClockTick.EVEN;
            this.handler();
            if (this.type == ClockType.TIMED) {
                this.stop();
            }
        };
        this.interval = interval;
        this.handler = handler;
        this.type = (duration == 0) ? ClockType.INFINITE : ClockType.TIMED;
    }
    start() {
        this.is_running = true;
        this.handle = (this.type == ClockType.INFINITE)
            ? window.setInterval(this.on_elapsed.bind(this), this.interval)
            : window.setTimeout(this.on_elapsed.bind(this), this.interval);
    }
    stop() {
        this.is_running = false;
        return (this.type == ClockType.INFINITE)
            ? window.clearInterval(this.handle)
            : window.clearTimeout(this.handle);
    }
    pause() { this.is_paused = true; }
    resume() { this.is_paused = false; }
}
