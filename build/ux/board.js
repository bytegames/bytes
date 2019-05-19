import { Position } from '../types/position.js';
import { Canvas } from './canvas.js';
export class Board {
    static place_object(object, position) {
        Board.grid[position.X][position.Y] = object;
        object.position = Position.copy(position);
    }
    static remove_object_at(position) {
        Board.grid[position.X][position.Y] = null;
    }
    static move_object(object, newPosition) {
        Board.remove_object_at(object.position);
        Board.place_object(object, newPosition);
    }
    static place_at_random(object) {
        var position = Board.generate_random_position();
        Board.place_object(object, position);
    }
    static move_to_random(object) {
        var position = Board.generate_random_position();
        Board.move_object(object, position);
    }
    static generate_random_position() {
        var position;
        while (!position) {
            var x = Math.floor(Math.random() * Board.width);
            var y = Math.floor(Math.random() * Board.height);
            if (!Board.grid[x][y]) {
                return new Position(x, y);
            }
        }
    }
    static init() {
        Board.height = Canvas.height / Board.block_size;
        Board.width = Canvas.width / Board.block_size;
        Board.grid = new Array(Board.width);
        for (var i = 0, ii = Board.width; i != ii; ++i) {
            Board.grid[i] = new Array(Board.height);
        }
    }
    static draw() {
        Canvas.fill(Board.bg_color);
        for (var cx = 0; cx < Board.width; cx++) {
            for (var cy = 0; cy < Board.height; cy++) {
                if (Board.grid[cx][cy]) {
                    Board.grid[cx][cy].draw();
                }
            }
        }
    }
}
Board.bg_color = "#000A1F";
Board.grid_color = "#001F5C";
Board.block_size = 8;
Board.height = 0;
Board.width = 0;
