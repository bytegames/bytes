namespace Bytes {

    export namespace Client {

        export class GameBoard implements IGameBoard {

            public backgroundColor: string = "#000A1F";
            public gridColor: string = "#001F5C";

            public blockSize = 8;

            public height: number;
            public width: number;

            public grid: number[][];
            public gridOffset: number = 4;

            public init() {

                // this.backgroundColor = board.backgroundColor;

                this.height = Game.height / this.blockSize;
                this.width = Game.width / this.blockSize;

                // Initialize grid index
                this.grid = new Array(this.width);
                for (var i = 0, ii = this.width; i != ii; ++i) {
                    this.grid[i] = new Array(this.height);
                }
            }

            public update(board: IGameBoard) {

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
            }

            public draw() {

                Canvas.fill(this.backgroundColor);

                var size = this.blockSize;
                for (var x = 0; x < this.width; x++) {
                    for (var y = 0; y < this.height; y++) {

                        // Canvas.drawRect(cx * size, cy * size, size, size, GameBoard.gridColor);

                        if (this.grid[x][y]) {

                            var index = this.grid[x][y];
                            // var gameObject = Game.ob
                            // this.grid[x][y].draw();
                        }
                    }
                }
            }           
        }
    }
}