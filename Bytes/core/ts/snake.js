var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bytes;
(function (Bytes) {
    var SnakeSegment = (function (_super) {
        __extends(SnakeSegment, _super);
        function SnakeSegment(position) {
            _super.call(this, position);
            this.color = "#04B404";
            this.position = position;
        }
        SnakeSegment.prototype.draw = function () {
            // var boardX = (this.position.X * Game.board.blockSize);
            //var boardY = (this.position.Y * Game.board.blockSize);
            // var size = Game.board.blockSize;
            // Canvas.fillRect(boardX, boardY, size, size, this.color);
        };
        return SnakeSegment;
    })(Bytes.GameObject);
    Bytes.SnakeSegment = SnakeSegment;
    var Snake = (function (_super) {
        __extends(Snake, _super);
        function Snake(position) {
            _super.call(this, position);
            this.isAlive = false;
            this.hiScore = 0;
            this.points = 0;
            this.lives = 5;
            this.segments = [];
            this.maxLength = 8;
        }
        Snake.update = function (snake) {
            var adapter = {
                direction: null,
                isAlive: null,
                hiScore: null,
                points: null,
                lives: null,
                segments: null,
                maxLength: null,
            };
            // Update properties
            for (var i in adapter) {
                snake.hasOwnProperty(i) && (Snake[i] = snake[i]);
            }
        };
        return Snake;
    })(SnakeSegment);
    Bytes.Snake = Snake;
})(Bytes || (Bytes = {}));
//# sourceMappingURL=snake.js.map