namespace Bytes {

    export namespace Client {

        export class GameBoard implements IGameBoard {

            public backgroundColor: string = "#000A1F";
            public gridColor: string = "#001F5C";

            public blockSize = 8;

            public height: number;
            public width: number;

            public grid: GameObject[][];

            public init() {

                // this.backgroundColor = board.backgroundColor;

                this.height = Game.height / this.blockSize;
                this.width = Game.width / this.blockSize;

                this.grid = new Array(this.width);
                for (var i = 0, ii = this.width; i != ii; ++i) {
                    this.grid[i] = new Array(this.height);
                }
            }

            public update(board: GameBoard) {

                var adapter = {
                    backgroundColor: null,
                    gridColor: null,
                    blockSize: null,
                    height: null,
                    width: null
                };
                    
                // Update properties
                for (var i in adapter) {
                    board.hasOwnProperty(i) && (this[i] = board[i]);
                }

                // Update grid
                for (var x = 0, xx = board.grid.length; x != xx; ++x) {
                    for (var y = 0, yy = board.grid[x].length; y != yy; ++y) {

                        var object = board.grid[x][y];
                        if (object.updated) {

                            this.grid[x][y] = object;
                            this.grid[x][y].updated = false;
                        }
                    }
                }             
            }

            public draw() {

                Canvas.fill(this.backgroundColor);

                var size = this.blockSize;
                for (var cx = 0; cx < this.width; cx++) {
                    for (var cy = 0; cy < this.height; cy++) {

                        // Canvas.drawRect(cx * size, cy * size, size, size, GameBoard.gridColor);

                        if (this.grid[cx][cy]) {
                            this.grid[cx][cy].draw();
                        }
                    }
                }
            }           
        }
    }
}