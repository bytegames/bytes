module Bytes {

    export class SnakeSegment extends GameObject implements IGameObject {

        public static default_length = 48

        public colorindex = 0

        public color(): string {

            let colors = [ 
                "#FF0000",
                "#FF9966",
                "#FFFA66",
                "#66FF66",
                "#66FFFD",
                "#6699FF",
                "#7966FF",
                "#F366FF"
            ] 

            this.colorindex++
            if (this.colorindex > colors.length) { this.colorindex = 0 }

            return colors[this.colorindex]
        }
                
        constructor(position: Position) {

            super();
            this.position = position;
        }

        public draw() {

            var boardX = (this.position.X * GameBoard.blockSize);
            var boardY = (this.position.Y * GameBoard.blockSize);
            var size = GameBoard.blockSize;

            Canvas.fillRect(boardX, boardY, size, size, this.color());
        }

        public handleCollision(snake: Snake) {

            snake.die();
        }
    }

    export class Snake extends SnakeSegment {

        public jump_distance = 8
        
        public direction: Direction;
        public speed: Speed = Speed.NORMAL;
        public skipNextTurn: boolean = false;

        public hitDetected: boolean = false;
        public isAlive: boolean = false;
        public hiScore: number = 0;
        public points: number = 0;
        public lives: number = 9000001;

        public segments: SnakeSegment[] = [];
        public maxLength: number = Snake.default_length;

        constructor(position: Position) {

            super(position);
            this.isAlive = true;
            this.position = position;
            this.segments[0] = this;
            GameBoard.placeObject(this, position);
        }

        public jump() {

            var position: Position = Position.copy(this.position);

            switch (this.direction) {

                case Direction.UP:
                    position.Y -= this.jump_distance;
                    break;

                case Direction.DOWN:
                    position.Y += this.jump_distance;
                    break;

                case Direction.LEFT:
                    position.X -= this.jump_distance;
                    break;

                case Direction.RIGHT:
                    position.X += this.jump_distance;
                    break;
            }

            this.updateBoard(position);
        }

        public onHitScreenEdge(edge: ScreenEdge) {
            
            //  this.die();

            switch (edge) {
                case ScreenEdge.NORTH:
                    
                    break;

                case ScreenEdge.SOUTH:
                    
                    break;

                case ScreenEdge.EAST:
                    
                    break;

                case ScreenEdge.WEST:
                    
                    break;

            }
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

        public setSpeed(speed: Speed) {
            
            this.speed = speed;
            this.skipNextTurn = (speed === Speed.SLOW);
        }

        public processTurn() {
                        
            if (!this.isAlive) {           
                return;
            }
                        
            // Skip every other clock tick unless moving fast
            if (this.speed != Speed.FAST && Game.clock.tick == ClockTick.ODD) {
                
                return;
            }

            // Skip 3 clock ticks if moving slow
            if (this.speed == Speed.SLOW && Game.clock.tick == ClockTick.EVEN) {

                this.skipNextTurn = !this.skipNextTurn;
                if (this.skipNextTurn) {
                    return ;
                }
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
                    pos.X = GameBoard.width - 1;

                    // this.onHitScreenEdge(ScreenEdge.WEST);
                }
                else if (pos.Y < 0) {
                    pos.Y = GameBoard.height - 1;
                    // this.onHitScreenEdge(ScreenEdge.NORTH);
                }
                else if (pos.X == GameBoard.width) {
                    pos.X = 0;
                    // this.onHitScreenEdge(ScreenEdge.SOUTH);
                }
                else if (pos.Y == GameBoard.height) {
                    pos.Y = 0;
                    // this.onHitScreenEdge(ScreenEdge.SOUTH);
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
            this.maxLength = Snake.default_length;
        }
    }
}