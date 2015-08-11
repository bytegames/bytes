var Bytes;
(function (Bytes) {
    (function (ClockType) {
        ClockType[ClockType["TIMED"] = 0] = "TIMED";
        ClockType[ClockType["INFINITE"] = 1] = "INFINITE";
    })(Bytes.ClockType || (Bytes.ClockType = {}));
    var ClockType = Bytes.ClockType;
    var Timer = (function () {
        function Timer(interval, duration, elaspedHandler) {
            this.onElapsed = function () { console.log("No clock event"); };
            this.interval = interval;
            this.duration = duration;
            this.onElapsed = elaspedHandler;
            this.type = (duration == 0) ? ClockType.INFINITE : ClockType.TIMED;
        }
        Timer.prototype._onElapsed = function () {
            if (this.isPaused) {
                return;
            }
            this.onElapsed();
            if (this.type == ClockType.TIMED) {
                this.stop();
            }
        };
        Timer.prototype.start = function () {
            this.isRunning = true;
            this.handle = (this.type == ClockType.INFINITE)
                ? window.setInterval(this._onElapsed.bind(this), this.interval)
                : window.setTimeout(this._onElapsed.bind(this), this.interval);
        };
        Timer.prototype.stop = function () {
            if (this.type == ClockType.INFINITE) {
                window.clearInterval(this.handle);
            }
            else {
                window.clearTimeout(this.handle);
            }
            this.isRunning = false;
        };
        Timer.prototype.pause = function () {
            this.isPaused = true;
        };
        Timer.prototype.resume = function () {
            this.isPaused = false;
        };
        return Timer;
    })();
    Bytes.Timer = Timer;
})(Bytes || (Bytes = {}));
//# sourceMappingURL=timer.js.map