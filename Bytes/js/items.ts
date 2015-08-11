module Bytes {

    export class Coin extends GameObject implements IGameObject {

        public static values: number[] = [200, 600, 800, 1000, 2000];
        public static instances: Coin[] = [];

        public index: number;
        public value: number;
        public position: Position;

        public constructor(value: number) {

            super();
            this.value = value;
        }

        public static generateRandom() {

            var coin = new Coin(Coin.values[Math.floor(Math.random() * Coin.values.length)]);
            coin.index = Coin.instances.push(coin);
            return coin;
        }

        public handleCollision(snake: Snake) {

            snake.points += this.value;
            snake.maxLength += (snake.maxLength / 2);
            GameBoard.removeObjectAt(this.position);
            Coin.instances.splice(this.index, 1);
        }

        public draw() {

            if (this.position) {

                var x = (this.position.X * GameBoard.blockSize) + (GameBoard.blockSize / 2) + 1;
                var y = (this.position.Y * GameBoard.blockSize) + (GameBoard.blockSize / 2) + 1;
                var r = (GameBoard.blockSize / 2) - 4;

                Canvas.context.beginPath();
                Canvas.context.arc(x, y, r, 0, 2 * Math.PI, false);
                Canvas.context.strokeStyle = "#FFFF00";
                Canvas.context.fillStyle = "#CCCC00";
                Canvas.context.stroke();
                Canvas.context.fill();

            }
        }
    }

}