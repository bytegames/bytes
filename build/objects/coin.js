import { Canvas, Board } from '../ux/index.js';
export class Coin {
    constructor(value) {
        this.value = value;
        this.index = Coin.coins_index;
        ++Coin.coins_index;
        ++Coin.coins_active;
    }
    static create_random() {
        return new Coin(Coin.values[Math.floor(Math.random() * Coin.values.length)]);
    }
    handle_collision(snake) {
        snake.points += this.value;
        snake.max_length += 8;
        this.destroy();
    }
    draw() {
        if (this.position) {
            let x = (this.position.X * Board.block_size) + (Board.block_size / 2);
            let y = (this.position.Y * Board.block_size) + (Board.block_size / 2);
            let r = (Board.block_size / 2) - 1;
            Canvas.context.beginPath();
            Canvas.context.arc(x, y, r, 0, 2 * Math.PI, false);
            Canvas.context.strokeStyle = "#FFFF00";
            Canvas.context.fillStyle = "#CCCC00";
            Canvas.context.stroke();
            Canvas.context.fill();
        }
    }
    destroy() {
        Board.remove_object_at(this.position);
        delete Coin.instances[this.index];
        --Coin.coins_active;
    }
}
Coin.values = [200, 600, 800, 1000, 2000];
Coin.instances = {};
Coin.coins_index = 0;
Coin.coins_active = 0;
