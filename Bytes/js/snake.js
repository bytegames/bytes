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
    var SnakeSegment = /** @class */ (function (_super) {
        __extends(SnakeSegment, _super);
        function SnakeSegment(position) {
            var _this = _super.call(this) || this;
            _this.colorindex = 0;
            _this.position = position;
            return _this;
        }
        SnakeSegment.prototype.color = function () {
            var colors = [
                "#FF0000",
                "#FF9966",
                "#FFFA66",
                "#66FF66",
                "#66FFFD",
                "#6699FF",
                "#7966FF",
                "#F366FF"
            ];
            this.colorindex++;
            if (this.colorindex > colors.length) {
                this.colorindex = 0;
            }
            return colors[this.colorindex];
        };
        SnakeSegment.prototype.draw = function () {
            var boardX = (this.position.X * Bytes.GameBoard.blockSize);
            var boardY = (this.position.Y * Bytes.GameBoard.blockSize);
            var size = Bytes.GameBoard.blockSize;
            Bytes.Canvas.fillRect(boardX, boardY, size, size, this.color());
        };
        SnakeSegment.prototype.handleCollision = function (snake) {
            snake.die();
        };
        return SnakeSegment;
    }(Bytes.GameObject));
    Bytes.SnakeSegment = SnakeSegment;
    var Snake = /** @class */ (function (_super) {
        __extends(Snake, _super);
        function Snake(position) {
            var _this = _super.call(this, position) || this;
            _this.jump_distance = 8;
            _this.speed = Bytes.Speed.NORMAL;
            _this.skipNextTurn = false;
            _this.hitDetected = false;
            _this.isAlive = false;
            _this.hiScore = 0;
            _this.points = 0;
            _this.lives = 9000001;
            _this.segments = [];
            _this.maxLength = 8;
            _this.isAlive = true;
            _this.position = position;
            _this.segments[0] = _this;
            Bytes.GameBoard.placeObject(_this, position);
            return _this;
        }
        Snake.prototype.jump = function () {
            var position = Bytes.Position.copy(this.position);
            switch (this.direction) {
                case Bytes.Direction.UP:
                    position.Y -= this.jump_distance;
                    break;
                case Bytes.Direction.DOWN:
                    position.Y += this.jump_distance;
                    break;
                case Bytes.Direction.LEFT:
                    position.X -= this.jump_distance;
                    break;
                case Bytes.Direction.RIGHT:
                    position.X += this.jump_distance;
                    break;
            }
            this.updateBoard(position);
        };
        Snake.prototype.onHitScreenEdge = function (edge) {
            //  this.die();
            switch (edge) {
                case Bytes.ScreenEdge.NORTH:
                    break;
                case Bytes.ScreenEdge.SOUTH:
                    break;
                case Bytes.ScreenEdge.EAST:
                    break;
                case Bytes.ScreenEdge.WEST:
                    break;
            }
        };
        Snake.prototype.die = function () {
            this.hitDetected = true;
            this.hiScore = this.points > this.hiScore
                ? this.points
                : this.hiScore;
            Bytes.Game.hiScore = this.hiScore > Bytes.Game.hiScore
                ? this.hiScore
                : Bytes.Game.hiScore;
            if (this.lives == 0) {
                this.isAlive = false;
                return Bytes.Game.reset();
            }
            this.lives -= 1;
            this.destroy();
            this.position = new Bytes.Position(0, 0);
            this.direction = Bytes.Direction.NONE;
        };
        Snake.prototype.setSpeed = function (speed) {
            this.speed = speed;
            this.skipNextTurn = (speed === Bytes.Speed.SLOW);
        };
        Snake.prototype.processTurn = function () {
            if (!this.isAlive) {
                return;
            }
            // Skip every other clock tick unless moving fast
            if (this.speed != Bytes.Speed.FAST && Bytes.Game.clock.tick == Bytes.ClockTick.ODD) {
                return;
            }
            // Skip 3 clock ticks if moving slow
            if (this.speed == Bytes.Speed.SLOW && Bytes.Game.clock.tick == Bytes.ClockTick.EVEN) {
                this.skipNextTurn = !this.skipNextTurn;
                if (this.skipNextTurn) {
                    return;
                }
            }
            this.hitDetected = false;
            var isMoving = true;
            var oldPos = Bytes.Position.copy(this.position);
            var pos = Bytes.Position.copy(this.position);
            switch (this.direction) {
                case Bytes.Direction.UP:
                    pos.Y -= 1;
                    break;
                case Bytes.Direction.DOWN:
                    pos.Y += 1;
                    break;
                case Bytes.Direction.LEFT:
                    pos.X -= 1;
                    break;
                case Bytes.Direction.RIGHT:
                    pos.X += 1;
                    break;
                case Bytes.Direction.NONE:
                    isMoving = false;
            }
            if (isMoving) {
                if (pos.X < 0) {
                    pos.X = Bytes.GameBoard.width - 1;
                    // this.onHitScreenEdge(ScreenEdge.WEST);
                }
                else if (pos.Y < 0) {
                    pos.Y = Bytes.GameBoard.height - 1;
                    // this.onHitScreenEdge(ScreenEdge.NORTH);
                }
                else if (pos.X == Bytes.GameBoard.width) {
                    pos.X = 0;
                    // this.onHitScreenEdge(ScreenEdge.SOUTH);
                }
                else if (pos.Y == Bytes.GameBoard.height) {
                    pos.Y = 0;
                    // this.onHitScreenEdge(ScreenEdge.SOUTH);
                }
                if (Bytes.GameBoard.grid[pos.X][pos.Y]) {
                    var object = Bytes.GameBoard.grid[pos.X][pos.Y];
                    object.handleCollision(this);
                }
            }
            if (!this.isAlive) {
                this.destroy();
            }
            else if (!this.hitDetected) {
                this.updateBoard(pos);
            }
        };
        Snake.prototype.updateBoard = function (pos) {
            var lastPosition = Bytes.Position.copy(this.position);
            for (var i = 0, ii = this.segments.length; i != ii; i++) {
                var segment = this.segments[i];
                var newPosition = (i == 0)
                    ? pos
                    : lastPosition;
                lastPosition = segment.position;
                Bytes.GameBoard.moveObject(segment, newPosition);
            }
            if (this.segments.length <= this.maxLength) {
                var newSegment = new SnakeSegment(lastPosition);
                this.segments.push(newSegment);
                Bytes.GameBoard.placeObject(newSegment, lastPosition);
            }
        };
        Snake.prototype.destroy = function () {
            for (var i = 0, ii = this.segments.length; i != ii; i++) {
                Bytes.GameBoard.removeObjectAt(this.segments[i].position);
            }
            this.segments = [this];
            this.maxLength = 8;
        };
        return Snake;
    }(SnakeSegment));
    Bytes.Snake = Snake;
})(Bytes || (Bytes = {}));
