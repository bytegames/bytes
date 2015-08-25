var Bytes;
(function (Bytes) {
    var Client;
    (function (Client) {
        var GameBoard = (function () {
            function GameBoard() {
                this.backgroundColor = "#000A1F";
                this.gridColor = "#001F5C";
                this.blockSize = 8;
                this.gridOffset = 4;
            }
            GameBoard.prototype.init = function () {
                // this.backgroundColor = board.backgroundColor;
                this.height = Client.Game.height / this.blockSize;
                this.width = Client.Game.width / this.blockSize;
                // Initialize grid index
                this.grid = new Array(this.width);
                for (var i = 0, ii = this.width; i != ii; ++i) {
                    this.grid[i] = new Array(this.height);
                }
            };
            GameBoard.prototype.update = function (board) {
                var adapter = {
                    backgroundColor: null,
                    gridColor: null,
                    blockSize: null,
                    height: null,
                    width: null
                };
                // Update properties
                for (var i in adapter) {
                    // Update if data provided for this property
                    board.hasOwnProperty(i) && (this[i] = board[i]);
                }
                // Update grid
                for (var x = 0, xx = board.grid.length; x != xx; ++x) {
                    for (var y = 0, yy = board.grid[x].length; y != yy; ++y) {
                        // Assign object index to grid
                        this.grid[x][y] = board.grid[x][y];
                    }
                }
            };
            GameBoard.prototype.draw = function () {
                Bytes.Canvas.fill(this.backgroundColor);
                var size = this.blockSize;
                for (var x = 0; x < this.width; x++) {
                    for (var y = 0; y < this.height; y++) {
                        // Canvas.drawRect(cx * size, cy * size, size, size, GameBoard.gridColor);
                        if (this.grid[x][y]) {
                            var index = this.grid[x][y];
                        }
                    }
                }
            };
            return GameBoard;
        })();
        Client.GameBoard = GameBoard;
    })(Client = Bytes.Client || (Bytes.Client = {}));
})(Bytes || (Bytes = {}));
//# sourceMappingURL=gameboard.js.map