var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Bytes;
(function (Bytes) {
    var SlowPlayerEvent = /** @class */ (function (_super) {
        __extends(SlowPlayerEvent, _super);
        function SlowPlayerEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SlowPlayerEvent;
    }(Bytes.GameEvent));
    Bytes.SlowPlayerEvent = SlowPlayerEvent;
    var SlowPlayer = /** @class */ (function (_super) {
        __extends(SlowPlayer, _super);
        function SlowPlayer() {
            var _this = _super.call(this) || this;
            _this.color = "#3366FF";
            _this.index = SlowPlayer.itemsIndex;
            ++SlowPlayer.itemsIndex;
            ++SlowPlayer.itemsActive;
            return _this;
        }
        SlowPlayer.prototype.handleCollision = function (snake) {
            snake.setSpeed(Bytes.Speed.SLOW);
            this.destroy();
        };
        SlowPlayer.prototype.draw = function () {
            if (this.position) {
                var x = (this.position.X * Bytes.GameBoard.blockSize) + 2;
                var y = (this.position.Y * Bytes.GameBoard.blockSize) + 2;
                var size = Bytes.GameBoard.blockSize - 4;
                Bytes.Canvas.drawRect(x, y, size, size, this.color);
            }
        };
        SlowPlayer.prototype.destroy = function () {
            Bytes.GameBoard.removeObjectAt(this.position);
            delete SlowPlayer.instances[this.index];
            --SlowPlayer.itemsActive;
        };
        SlowPlayer.instances = {};
        SlowPlayer.itemsIndex = 0;
        SlowPlayer.itemsActive = 0;
        return SlowPlayer;
    }(Bytes.GameObject));
    Bytes.SlowPlayer = SlowPlayer;
    var FastPlayer = /** @class */ (function (_super) {
        __extends(FastPlayer, _super);
        function FastPlayer() {
            var _this = _super.call(this) || this;
            _this.color = "#3366FF";
            _this.index = SlowPlayer.itemsIndex;
            ++SlowPlayer.itemsIndex;
            ++SlowPlayer.itemsActive;
            return _this;
        }
        FastPlayer.prototype.handleCollision = function (snake) {
            snake.setSpeed(Bytes.Speed.FAST);
            this.destroy();
        };
        FastPlayer.prototype.draw = function () {
            if (this.position) {
                var x = (this.position.X * Bytes.GameBoard.blockSize) + 2;
                var y = (this.position.Y * Bytes.GameBoard.blockSize) + 2;
                var size = Bytes.GameBoard.blockSize - 4;
                Bytes.Canvas.drawRect(x, y, size, size, this.color);
            }
        };
        FastPlayer.prototype.destroy = function () {
            Bytes.GameBoard.removeObjectAt(this.position);
            delete SlowPlayer.instances[this.index];
            --SlowPlayer.itemsActive;
        };
        FastPlayer.instances = {};
        FastPlayer.itemsIndex = 0;
        FastPlayer.itemsActive = 0;
        return FastPlayer;
    }(Bytes.GameObject));
    Bytes.FastPlayer = FastPlayer;
    var Coin = /** @class */ (function (_super) {
        __extends(Coin, _super);
        function Coin(value) {
            var _this = _super.call(this) || this;
            _this.value = value;
            _this.index = Coin.coinsIndex;
            ++Coin.coinsIndex;
            ++Coin.coinsActive;
            return _this;
        }
        Coin.generateRandom = function () {
            return new Coin(Coin.values[Math.floor(Math.random() * Coin.values.length)]);
        };
        Coin.prototype.handleCollision = function (snake) {
            snake.points += this.value;
            snake.maxLength += 8;
            this.destroy();
        };
        Coin.prototype.draw = function () {
            if (this.position) {
                var x = (this.position.X * Bytes.GameBoard.blockSize) + (Bytes.GameBoard.blockSize / 2);
                var y = (this.position.Y * Bytes.GameBoard.blockSize) + (Bytes.GameBoard.blockSize / 2);
                var r = (Bytes.GameBoard.blockSize / 2) - 1;
                Bytes.Canvas.context.beginPath();
                Bytes.Canvas.context.arc(x, y, r, 0, 2 * Math.PI, false);
                Bytes.Canvas.context.strokeStyle = "#FFFF00";
                Bytes.Canvas.context.fillStyle = "#CCCC00";
                Bytes.Canvas.context.stroke();
                Bytes.Canvas.context.fill();
            }
        };
        Coin.prototype.destroy = function () {
            Bytes.GameBoard.removeObjectAt(this.position);
            delete Coin.instances[this.index];
            --Coin.coinsActive;
        };
        Coin.values = [200, 600, 800, 1000, 2000];
        Coin.instances = {};
        Coin.coinsIndex = 0;
        Coin.coinsActive = 0;
        return Coin;
    }(Bytes.GameObject));
    Bytes.Coin = Coin;
})(Bytes || (Bytes = {}));
