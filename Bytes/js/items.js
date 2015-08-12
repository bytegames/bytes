var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bytes;
(function (Bytes) {
    var Coin = (function (_super) {
        __extends(Coin, _super);
        function Coin(value) {
            _super.call(this);
            this.value = value;
        }
        Coin.generateRandom = function () {
            var coin = new Coin(Coin.values[Math.floor(Math.random() * Coin.values.length)]);
            coin.index = Coin.coinIndex;
            ++Coin.coinIndex;
            ++Coin.coinsActive;
            return coin;
        };
        Coin.prototype.handleCollision = function (snake) {
            snake.points += this.value;
            snake.maxLength += 8;
            Bytes.GameBoard.removeObjectAt(this.position);
            delete Coin.instances[this.index];
            --Coin.coinsActive;
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
        Coin.values = [200, 600, 800, 1000, 2000];
        Coin.instances = {};
        Coin.coinIndex = 0;
        Coin.coinsActive = 0;
        return Coin;
    })(Bytes.GameObject);
    Bytes.Coin = Coin;
})(Bytes || (Bytes = {}));
//# sourceMappingURL=items.js.map