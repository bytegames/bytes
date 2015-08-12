var Bytes;
(function (Bytes) {
    var GameBoard = (function () {
        function GameBoard() {
        }
        GameBoard.placeObject = function (object, position) {
            GameBoard.grid[position.X][position.Y] = object;
            object.position = Bytes.Position.copy(position);
        };
        GameBoard.removeObjectAt = function (position) {
            GameBoard.grid[position.X][position.Y] = null;
        };
        GameBoard.moveObject = function (object, newPosition) {
            GameBoard.removeObjectAt(object.position);
            GameBoard.placeObject(object, newPosition);
        };
        GameBoard.placeAtRandom = function (object) {
            var position = GameBoard.generateRandomPosition();
            GameBoard.placeObject(object, position);
        };
        ;
        GameBoard.moveToRandom = function (object) {
            var position = GameBoard.generateRandomPosition();
            GameBoard.moveObject(object, position);
        };
        GameBoard.generateRandomPosition = function () {
            var position;
            while (!position) {
                var x = Math.floor(Math.random() * GameBoard.width);
                var y = Math.floor(Math.random() * GameBoard.height);
                if (!GameBoard.grid[x][y]) {
                    return new Bytes.Position(x, y);
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
        GameBoard.draw = function () {
            Bytes.Canvas.fill(GameBoard.backgroundColor);
            var size = GameBoard.blockSize;
            for (var cx = 0; cx < GameBoard.width; cx++) {
                for (var cy = 0; cy < GameBoard.height; cy++) {
                    // Canvas.drawRect(cx * size, cy * size, size, size, GameBoard.gridColor);
                    if (GameBoard.grid[cx][cy]) {
                        GameBoard.grid[cx][cy].draw();
                    }
                }
            }
        };
        GameBoard.backgroundColor = "#000A1F";
        GameBoard.gridColor = "#001F5C";
        GameBoard.blockSize = 8;
        return GameBoard;
    })();
    Bytes.GameBoard = GameBoard;
})(Bytes || (Bytes = {}));
//# sourceMappingURL=gameboard.js.map