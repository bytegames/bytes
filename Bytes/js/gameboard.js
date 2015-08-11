var Bytes;
(function (Bytes) {
    var GameBoard = (function () {
        function GameBoard() {
        }
        GameBoard.placeObject = function (object, position) {
            GameBoard.grid[position.X][position.Y] = object;
        };
        GameBoard.removeObjectAt = function (position) {
            GameBoard.grid[position.X][position.Y] = null;
        };
        GameBoard.moveObject = function (object, newPosition) {
            GameBoard.removeObjectAt(object.position);
            GameBoard.placeObject(object, newPosition);
            object.position = Bytes.Position.copy(newPosition);
        };
        GameBoard.draw = function () {
            Bytes.Canvas.fill(GameBoard.backgroundColor);
            var size = GameBoard.blockSize;
            for (var cx = 0; cx < GameBoard.width; cx++) {
                for (var cy = 0; cy < GameBoard.height; cy++) {
                    Bytes.Canvas.drawRect(cx * size, cy * size, size, size, GameBoard.gridColor);
                }
            }
        };
        GameBoard.init = function () {
            GameBoard.height = Bytes.Canvas.height / GameBoard.blockSize;
            GameBoard.width = Bytes.Canvas.width / GameBoard.blockSize;
            GameBoard.grid = new Array(GameBoard.width);
            for (var i = 0, ii = GameBoard.width; i != ii; ++i) {
                GameBoard.grid[i] = new Array(GameBoard.height);
            }
        };
        GameBoard.backgroundColor = "#000A1F";
        GameBoard.gridColor = "#001F5C";
        GameBoard.blockSize = 16;
        return GameBoard;
    })();
    Bytes.GameBoard = GameBoard;
})(Bytes || (Bytes = {}));
//# sourceMappingURL=gameboard.js.map