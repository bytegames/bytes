import { Canvas } from '../ux/canvas.js';
import { Board } from '../ux/board.js';
export class SnakeSegment {
    constructor(position) {
        this.color_index = 0;
        this.position = position;
    }
    color() {
        let colors = [
            "#FF0000", "#FF9966",
            "#FFFA66", "#66FF66",
            "#66FFFD", "#6699FF",
            "#7966FF", "#F366FF"
        ];
        this.color_index++;
        if (this.color_index > colors.length) {
            this.color_index = 0;
        }
        return colors[this.color_index];
    }
    draw() {
        var boardX = (this.position.X * Board.block_size);
        var boardY = (this.position.Y * Board.block_size);
        var size = Board.block_size;
        Canvas.fill_rect(boardX, boardY, size, size, this.color());
    }
    handle_collision(snake) { snake.die(); }
}
SnakeSegment.default_length = 48;
