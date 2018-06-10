module Bytes {

    export class GameBoard {

        public static backgroundColor: string = "#000A1F";
        public static gridColor: string = "#001F5C";

        public static blockSize = 8;

        public static height;
        public static width;

        public static grid: GameObject[][];

        public static placeObject(object: GameObject, position: Position) {

            GameBoard.grid[position.X][position.Y] = object;
            object.position = Position.copy(position);
        }

        public static removeObjectAt(position: Position) {

            GameBoard.grid[position.X][position.Y] = null;
        }

        public static moveObject(object: GameObject, newPosition: Position) {

            GameBoard.removeObjectAt(object.position);
            GameBoard.placeObject(object, newPosition);            
        }

        public static placeAtRandom(object: GameObject) {

            var position = GameBoard.generateRandomPosition();
            GameBoard.placeObject(object, position);
        };

        public static moveToRandom(object: GameObject) {

            var position = GameBoard.generateRandomPosition();
            GameBoard.moveObject(object, position);
        }
        
        public static generateRandomPosition() {

            var position: Position;
            while (!position) {

                var x = Math.floor(Math.random() * GameBoard.width);
                var y = Math.floor(Math.random() * GameBoard.height);
                if (!GameBoard.grid[x][y]) {
                    return new Bytes.Position(x, y);
                }
            }
        }

        public static init() {

            GameBoard.height = Canvas.height / GameBoard.blockSize;
            GameBoard.width = Canvas.width / GameBoard.blockSize;

            GameBoard.grid = new Array(GameBoard.width);
            for (var i = 0, ii = GameBoard.width; i != ii; ++i) {
                GameBoard.grid[i] = new Array(GameBoard.height);
            }
        }
        
        public static draw() {

            Canvas.fill(GameBoard.backgroundColor);

            var size = GameBoard.blockSize;
            for (var cx = 0; cx < GameBoard.width; cx++) {
                for (var cy = 0; cy < GameBoard.height; cy++) {

                    // Canvas.drawRect(cx * size, cy * size, size, size, GameBoard.gridColor);

                    if (GameBoard.grid[cx][cy]) {
                        GameBoard.grid[cx][cy].draw();
                    }
                }
            }
        }
    }
}