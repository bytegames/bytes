var Bytes;
(function (Bytes) {
    var GameBoard = (function () {
        function GameBoard() {
            this.backgroundColor = "#000A1F";
            this.gridColor = "#001F5C";
            this.blockSize = 8;
        }
        GameBoard.prototype.placeObject = function (object, position) {
            this.grid[position.X][position.Y] = object.index;
            object.position = Bytes.Position.copy(position);
            // object.updated = true;
        };
        GameBoard.prototype.placeAtRandom = function (object) {
            var position = this.generateRandomPosition();
            this.placeObject(object, position);
        };
        ;
        GameBoard.prototype.moveObject = function (object, newPosition) {
            this.removeObjectAt(object.position);
            this.placeObject(object, newPosition);
        };
        GameBoard.prototype.moveToRandom = function (object) {
            var position = this.generateRandomPosition();
            this.moveObject(object, position);
        };
        GameBoard.prototype.removeObjectAt = function (position) {
            this.grid[position.X][position.Y] = null;
        };
        GameBoard.prototype.generateRandomPosition = function () {
            var position;
            while (!position) {
                var x = Math.floor(Math.random() * this.width);
                var y = Math.floor(Math.random() * this.height);
                if (!this.grid[x][y]) {
                    return new Bytes.Position(x, y);
                }
            }
        };
        GameBoard.prototype.init = function () {
            this.height = Bytes.Canvas.height / this.blockSize;
            this.width = Bytes.Canvas.width / this.blockSize;
            this.grid = new Array(this.width);
            for (var i = 0, ii = this.width; i != ii; ++i) {
                this.grid[i] = new Array(this.height);
            }
        };
        return GameBoard;
    })();
    Bytes.GameBoard = GameBoard;
})(Bytes || (Bytes = {}));
//# sourceMappingURL=gameboard.js.map