var Bytes;
(function (Bytes) {
    var GameObject = /** @class */ (function () {
        function GameObject() {
        }
        GameObject.prototype.handleCollision = function (object) {
        };
        GameObject.prototype.draw = function () {
        };
        return GameObject;
    }());
    Bytes.GameObject = GameObject;
    var GameEvent = /** @class */ (function () {
        function GameEvent() {
        }
        return GameEvent;
    }());
    Bytes.GameEvent = GameEvent;
    var ScreenEdge;
    (function (ScreenEdge) {
        ScreenEdge[ScreenEdge["NORTH"] = 0] = "NORTH";
        ScreenEdge[ScreenEdge["SOUTH"] = 1] = "SOUTH";
        ScreenEdge[ScreenEdge["EAST"] = 2] = "EAST";
        ScreenEdge[ScreenEdge["WEST"] = 3] = "WEST";
    })(ScreenEdge = Bytes.ScreenEdge || (Bytes.ScreenEdge = {}));
    var Direction;
    (function (Direction) {
        Direction[Direction["UP"] = 0] = "UP";
        Direction[Direction["DOWN"] = 1] = "DOWN";
        Direction[Direction["LEFT"] = 2] = "LEFT";
        Direction[Direction["RIGHT"] = 3] = "RIGHT";
        Direction[Direction["NONE"] = 4] = "NONE";
    })(Direction = Bytes.Direction || (Bytes.Direction = {}));
    var Position = /** @class */ (function () {
        function Position(x, y) {
            this.X = x;
            this.Y = y;
        }
        Position.copy = function (position) {
            return new Position(position.X, position.Y);
        };
        return Position;
    }());
    Bytes.Position = Position;
    var Speed;
    (function (Speed) {
        Speed[Speed["SLOW"] = 0] = "SLOW";
        Speed[Speed["NORMAL"] = 1] = "NORMAL";
        Speed[Speed["FAST"] = 2] = "FAST";
    })(Speed = Bytes.Speed || (Bytes.Speed = {}));
})(Bytes || (Bytes = {}));
