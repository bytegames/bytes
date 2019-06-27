export var GameKey;
(function (GameKey) {
    GameKey[GameKey["PLAYER_ONE_UP"] = 38] = "PLAYER_ONE_UP";
    GameKey[GameKey["PLAYER_ONE_DOWN"] = 40] = "PLAYER_ONE_DOWN";
    GameKey[GameKey["PLAYER_ONE_LEFT"] = 37] = "PLAYER_ONE_LEFT";
    GameKey[GameKey["PLAYER_ONE_RIGHT"] = 39] = "PLAYER_ONE_RIGHT";
    GameKey[GameKey["PLAYER_ONE_JUMP"] = 32] = "PLAYER_ONE_JUMP";
    GameKey[GameKey["PLAYER_TWO_UP"] = 87] = "PLAYER_TWO_UP";
    GameKey[GameKey["PLAYER_TWO_DOWN"] = 83] = "PLAYER_TWO_DOWN";
    GameKey[GameKey["PLAYER_TWO_LEFT"] = 65] = "PLAYER_TWO_LEFT";
    GameKey[GameKey["PLAYER_TWO_RIGHT"] = 68] = "PLAYER_TWO_RIGHT";
    GameKey[GameKey["PLAYER_TWO_JUMP"] = 16] = "PLAYER_TWO_JUMP";
})(GameKey || (GameKey = {}));
export var ScreenEdge;
(function (ScreenEdge) {
    ScreenEdge[ScreenEdge["NORTH"] = 0] = "NORTH";
    ScreenEdge[ScreenEdge["SOUTH"] = 1] = "SOUTH";
    ScreenEdge[ScreenEdge["EAST"] = 2] = "EAST";
    ScreenEdge[ScreenEdge["WEST"] = 3] = "WEST";
})(ScreenEdge || (ScreenEdge = {}));
export var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["DOWN"] = 1] = "DOWN";
    Direction[Direction["LEFT"] = 2] = "LEFT";
    Direction[Direction["RIGHT"] = 3] = "RIGHT";
    Direction[Direction["NONE"] = 4] = "NONE";
})(Direction || (Direction = {}));
export var Speed;
(function (Speed) {
    Speed[Speed["SLOW"] = 0] = "SLOW";
    Speed[Speed["NORMAL"] = 1] = "NORMAL";
    Speed[Speed["FAST"] = 2] = "FAST";
})(Speed || (Speed = {}));
