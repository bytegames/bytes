module Bytes {

    export class SlowPlayerEvent extends GameEvent {

    }
    
    export class SlowPlayer extends GameObject implements IGameObject {

        public static instances: { [index: number]: Coin } = {};
        public static itemsIndex: number = 0;
        public static itemsActive: number = 0;

        public index: number;
        public color = "#3366FF";

        constructor() {

            super();
            this.index = SlowPlayer.itemsIndex;
            ++SlowPlayer.itemsIndex;
            ++SlowPlayer.itemsActive;
        }

        public handleCollision(snake: Snake) {

            snake.setSpeed(Speed.SLOW);
            this.destroy();
        }

        public draw() {

            if (this.position) {

                var x = (this.position.X * GameBoard.blockSize) + 2;
                var y = (this.position.Y * GameBoard.blockSize) + 2;
                var size = GameBoard.blockSize - 4;

                Canvas.drawRect(x, y, size, size, this.color);                
            }
        }
        
        public destroy() {

            GameBoard.removeObjectAt(this.position);
            delete SlowPlayer.instances[this.index];
            --SlowPlayer.itemsActive;
        }
    }

    export class FastPlayer extends GameObject implements IGameObject {

        public static instances: { [index: number]: Coin } = {};
        public static itemsIndex: number = 0;
        public static itemsActive: number = 0;

        public index: number;
        public color = "#3366FF";

        constructor() {

            super();
            this.index = SlowPlayer.itemsIndex;
            ++SlowPlayer.itemsIndex;
            ++SlowPlayer.itemsActive;
        }

        public handleCollision(snake: Snake) {

            snake.setSpeed(Speed.FAST);
            this.destroy();
        }

        public draw() {

            if (this.position) {

                var x = (this.position.X * GameBoard.blockSize) + 2;
                var y = (this.position.Y * GameBoard.blockSize) + 2;
                var size = GameBoard.blockSize - 4;

                Canvas.drawRect(x, y, size, size, this.color);
            }
        }

        public destroy() {

            GameBoard.removeObjectAt(this.position);
            delete SlowPlayer.instances[this.index];
            --SlowPlayer.itemsActive;
        }
    }


    export class Coin extends GameObject implements IGameObject {

        public static values: number[] = [200, 600, 800, 1000, 2000];
        public static instances: { [index: number]: Coin } = {};
        public static coinsIndex: number = 0;
        public static coinsActive: number = 0;

        public index: number;
        public value: number;

        public constructor(value: number) {

            super();
            this.value = value;
            this.index = Coin.coinsIndex;
            ++Coin.coinsIndex;
            ++Coin.coinsActive;
        }

        public static generateRandom() {

            return new Coin(Coin.values[Math.floor(Math.random() * Coin.values.length)]);            
        }

        public handleCollision(snake: Snake) {

            snake.points += this.value;
            snake.maxLength += 8;
            this.destroy();
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

        public destroy() {

            GameBoard.removeObjectAt(this.position);
            delete Coin.instances[this.index];
            --Coin.coinsActive;           
        }
    }
}