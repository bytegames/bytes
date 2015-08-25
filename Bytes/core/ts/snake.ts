namespace Bytes {


        export class SnakeSegment extends GameObject {

            public color: string = "#04B404";

            constructor(position: Position) {

                super(position);
                this.position = position;
            }

            public draw() {

               // var boardX = (this.position.X * Game.board.blockSize);
                //var boardY = (this.position.Y * Game.board.blockSize);
               // var size = Game.board.blockSize;

               // Canvas.fillRect(boardX, boardY, size, size, this.color);
            }
        }

        export class Snake extends SnakeSegment {

            public direction: Direction;            
                        
            public isAlive: boolean = false;
            public hiScore: number = 0;
            public points: number = 0;
            public lives: number = 5;

            public segments: SnakeSegment[] = [];
            public maxLength: number = 8;

            constructor(position: Position) {

                super(position);                
            }            

            static update(snake: Snake) {

                var adapter = {
                    direction: null,                    
                    isAlive: null,
                    hiScore: null,
                    points: null,
                    lives: null,
                    segments: null,
                    maxLength: null,
                };

                // Update properties
                for (var i in adapter) {
                    snake.hasOwnProperty(i) && (Snake[i] = snake[i]);
                }
            }
        }
    } 
}