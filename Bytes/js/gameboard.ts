module Bytes {

    export class GameBoard {

        public static backgroundColor: string = "#000A1F";
        public static gridColor: string = "#001F5C";

        public static blockSize = 16;

        public static height;
        public static width;

        public static grid: GameObject[][];

        public static placeObject(object: GameObject, position: Position) {

            GameBoard.grid[position.X][position.Y] = object;
        }

        public static removeObjectAt(position: Position) {

            GameBoard.grid[position.X][position.Y] = null;
        }

        public static moveObject(object: GameObject, newPosition: Position) {

            GameBoard.removeObjectAt(object.position);
            GameBoard.placeObject(object, newPosition);
            object.position = Position.copy(newPosition);
        }

        public static draw() {

            Canvas.fill(GameBoard.backgroundColor);

            var size = GameBoard.blockSize;
            for (var cx = 0; cx < GameBoard.width; cx++) {
                for (var cy = 0; cy < GameBoard.height; cy++) {

                    Canvas.drawRect(cx * size, cy * size, size, size, GameBoard.gridColor);
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
    }
}