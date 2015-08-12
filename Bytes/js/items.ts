module Bytes {

    export class Coin extends GameObject implements IGameObject {

        public static values: number[] = [200, 600, 800, 1000, 2000];
        public static instances: { [index: number]: Coin } = {};
        public static coinIndex: number = 0;
        public static coinsActive: number = 0;

        public index: number;
        public value: number;
        public position: Position;

        public constructor(value: number) {

            super();
            this.value = value;
        }

        public static generateRandom() {

            var coin = new Coin(Coin.values[Math.floor(Math.random() * Coin.values.length)]);
            coin.index = Coin.coinIndex;
            ++Coin.coinIndex;
            ++Coin.coinsActive;
            return coin;
        }

        public handleCollision(snake: Snake) {

            snake.points += this.value;
            snake.maxLength += 8;
            GameBoard.removeObjectAt(this.position);
            delete Coin.instances[this.index];
            --Coin.coinsActive;           
        }

        public draw() {

            if (this.position) {

                var x = (this.position.X * GameBoard.blockSize) + (GameBoard.blockSize / 2);
                var y = (this.position.Y * GameBoard.blockSize) + (GameBoard.blockSize / 2);
                var r = (GameBoard.blockSize / 2) - 1;

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