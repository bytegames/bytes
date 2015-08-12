module Bytes {

    export class SnakeSegment extends GameObject implements IGameObject {

        public color: string = "#04B404";
                
        constructor(position: Position) {

            super();
            this.position = position;
        }

        public draw() {

            var boardX = (this.position.X * GameBoard.blockSize);
            var boardY = (this.position.Y * GameBoard.blockSize);
            var size = GameBoard.blockSize;

            Canvas.fillRect(boardX, boardY, size, size, this.color);
        }

        public handleCollision(snake: Snake) {

            snake.die();
        }
    }

    export class Snake extends SnakeSegment {

        public direction: Direction;

        public hitDetected: boolean = false;
        public isAlive: boolean = false;
        public hiScore: number = 0;
        public points: number = 0;
        public lives: number = 5;

        public segments: SnakeSegment[] = [];
        public maxLength: number = 8;

        constructor(position: Position) {

            super(position);
            this.isAlive = true;
            this.position = position;
            this.segments[0] = this;
            GameBoard.placeObject(this, position);
        }

        public onHitScreenEdge(edge: ScreenEdge) {
            
            this.die();
        }

        public die() {
            
            this.hitDetected = true;
            this.hiScore = this.points > this.hiScore
                ? this.points
                : this.hiScore;
            
            Game.hiScore = this.hiScore > Game.hiScore
                ? this.hiScore
                : Game.hiScore;

            if (this.lives == 0) {

                this.isAlive = false;
                return Game.reset();
            }

            this.lives -= 1;
            this.destroy();

            this.position = new Position(0, 0);
            this.direction = Direction.NONE;
        }

        public processTurn() {
                        
            if (!this.isAlive) {           
                return;
            }

            this.hitDetected = false;
            var isMoving = true;
            var oldPos: Position = Position.copy(this.position);
            var pos: Position = Position.copy(this.position);

            switch (this.direction) {

                case Direction.UP:
                    pos.Y -= 1;
                    break;

                case Direction.DOWN:
                    pos.Y += 1;
                    break;

                case Direction.LEFT:
                    pos.X -= 1;
                    break;

                case Direction.RIGHT:
                    pos.X += 1;
                    break;

                case Direction.NONE:
                    isMoving = false;
            }
            
            if (isMoving) {

                if (pos.X < 0) {
                    this.onHitScreenEdge(ScreenEdge.WEST);
                }
                else if (pos.Y < 0) {
                    this.onHitScreenEdge(ScreenEdge.NORTH);
                }
                else if (pos.X == GameBoard.width) {
                    this.onHitScreenEdge(ScreenEdge.SOUTH);
                }
                else if (pos.Y == GameBoard.height) {
                    this.onHitScreenEdge(ScreenEdge.SOUTH);
                }

                if (GameBoard.grid[pos.X][pos.Y]) {
                    var object: GameObject = GameBoard.grid[pos.X][pos.Y];
                    object.handleCollision(this);
                }
            }
            
            if (!this.isAlive) {
                this.destroy();
            }
            else if (!this.hitDetected) {
                this.updateBoard(pos);
            }
        }

        private updateBoard(pos: Position) {

            var lastPosition = Position.copy(this.position);
            for (var i = 0, ii = this.segments.length; i != ii; i++) {

                var segment = this.segments[i];
                var newPosition = (i == 0)
                    ? pos
                    : lastPosition;

                lastPosition = segment.position;
                GameBoard.moveObject(segment, newPosition);                
            }

            if (this.segments.length <= this.maxLength) {

                var newSegment = new SnakeSegment(lastPosition);
                this.segments.push(newSegment);

                GameBoard.placeObject(newSegment, lastPosition);                
            }            
        }        

        private destroy() {

            for (var i = 0, ii = this.segments.length; i != ii; i++) {
                GameBoard.removeObjectAt(this.segments[i].position);                
            }

            this.segments = [this];
            this.maxLength = 8;
        }
    }
}