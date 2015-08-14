var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bytes;
(function (Bytes) {
    var SlowPlayerEvent = (function (_super) {
        __extends(SlowPlayerEvent, _super);
        function SlowPlayerEvent() {
            _super.apply(this, arguments);
        }
        return SlowPlayerEvent;
    })(Bytes.GameEvent);
    Bytes.SlowPlayerEvent = SlowPlayerEvent;
    var SlowPlayer = (function (_super) {
        __extends(SlowPlayer, _super);
        function SlowPlayer() {
            _super.call(this);
            this.color = "#3366FF";
            this.index = SlowPlayer.itemsIndex;
            ++SlowPlayer.itemsIndex;
            ++SlowPlayer.itemsActive;
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
    })(Bytes.GameObject);
    Bytes.SlowPlayer = SlowPlayer;
    var FastPlayer = (function (_super) {
        __extends(FastPlayer, _super);
        function FastPlayer() {
            _super.call(this);
            this.color = "#3366FF";
            this.index = SlowPlayer.itemsIndex;
            ++SlowPlayer.itemsIndex;
            ++SlowPlayer.itemsActive;
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
    })(Bytes.GameObject);
    Bytes.FastPlayer = FastPlayer;
    var Coin = (function (_super) {
        __extends(Coin, _super);
        function Coin(value) {
            _super.call(this);
            this.value = value;
            this.index = Coin.coinsIndex;
            ++Coin.coinsIndex;
            ++Coin.coinsActive;
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
    })(Bytes.GameObject);
    Bytes.Coin = Coin;
})(Bytes || (Bytes = {}));
//# sourceMappingURL=items.js.map