window['version'] = '8/16/2015 3:04 AM';
var Bytes;
(function (Bytes) {
    var GameBoard = (function () {
        function GameBoard() {
        }
        GameBoard.placeObject = function (object, position) {
            GameBoard.grid[position.X][position.Y] = object;
            object.position = Bytes.Position.copy(position);
        };
        GameBoard.removeObjectAt = function (position) {
            GameBoard.grid[position.X][position.Y] = null;
        };
        GameBoard.moveObject = function (object, newPosition) {
            GameBoard.removeObjectAt(object.position);
            GameBoard.placeObject(object, newPosition);
        };
        GameBoard.placeAtRandom = function (object) {
            var position = GameBoard.generateRandomPosition();
            GameBoard.placeObject(object, position);
        };
        ;
        GameBoard.moveToRandom = function (object) {
            var position = GameBoard.generateRandomPosition();
            GameBoard.moveObject(object, position);
        };
        GameBoard.generateRandomPosition = function () {
            var position;
            while (!position) {
                var x = Math.floor(Math.random() * GameBoard.width);
                var y = Math.floor(Math.random() * GameBoard.height);
                if (!GameBoard.grid[x][y]) {
                    return new Bytes.Position(x, y);
                }
            }
        };
        GameBoard.init = function () {
            GameBoard.height = Bytes.Canvas.height / GameBoard.blockSize;
            GameBoard.width = Bytes.Canvas.width / GameBoard.blockSize;
            GameBoard.grid = new Array(GameBoard.width);
            for (var i = 0, ii = GameBoard.width; i != ii; ++i) {
                GameBoard.grid[i] = new Array(GameBoard.height);
            }
        };
        GameBoard.draw = function () {
            Bytes.Canvas.fill(GameBoard.backgroundColor);
            var size = GameBoard.blockSize;
            for (var cx = 0; cx < GameBoard.width; cx++) {
                for (var cy = 0; cy < GameBoard.height; cy++) {
                    // Canvas.drawRect(cx * size, cy * size, size, size, GameBoard.gridColor);
                    if (GameBoard.grid[cx][cy]) {
                        GameBoard.grid[cx][cy].draw();
                    }
                }
            }
        };
        GameBoard.backgroundColor = "#000A1F";
        GameBoard.gridColor = "#001F5C";
        GameBoard.blockSize = 8;
        return GameBoard;
    })();
    Bytes.GameBoard = GameBoard;
})(Bytes || (Bytes = {}));
var Bytes;
(function (Bytes) {
    var GameDifficulty = (function () {
        function GameDifficulty() {
        }
        GameDifficulty.EASY = 300;
        GameDifficulty.MEDIUM = 150;
        GameDifficulty.DIFFICULT = 50;
        return GameDifficulty;
    })();
    var Game = (function () {
        function Game() {
        }
        Game.init = function () {
            Bytes.Canvas.init(document.querySelector("canvas"));
            Bytes.Controls.init();
            Game.htmlBody = document.querySelector("body");
            Game.htmlBody.onkeyup = Bytes.Controls.onKeyUp;
            Game.ready();
        };
        Game.ready = function () {
            Bytes.GameBoard.init();
            Bytes.GameBoard.draw();
            Game.player1 = new Bytes.Snake({ X: 0, Y: 0 });
            Game.player1.direction = Bytes.Direction.RIGHT;
            Game.clock = new Bytes.Timer(GameDifficulty.DIFFICULT, 0, Game.onClockTick);
            Bytes.GUI.draw();
        };
        Game.start = function () {
            if (Game.isRunning) {
                return;
            }
            if (Game.clock.isPaused) {
                return Game.togglePause();
            }
            Game.isRunning = true;
            Game.clock.start();
        };
        Game.togglePause = function () {
            if (Game.clock.isPaused) {
                Game.clock.resume();
                Game.isRunning = true;
            }
            else {
                Game.clock.pause();
                Game.isRunning = false;
                Bytes.GUI.draw();
            }
        };
        Game.reset = function () {
            Game.clock && Game.clock.stop();
            Game.isRunning = false;
            Game.ready();
        };
        Game.onClockTick = function () {
            Bytes.Controls.processInput();
            Game.player1.processTurn();
            if (Game.clock.tick == Bytes.ClockTick.EVEN) {
                // TODO: Move this to item randomizer class
                Game.coinCounter += 1;
                if (Game.coinCounter >= 20) {
                    Game.coinCounter = 0;
                    if (!Math.floor(Math.random() + .5)) {
                        var probability = (Bytes.Coin.coinsActive + .5) / 5;
                        if (!Math.floor(Math.random() + probability)) {
                            if (!Math.floor(Math.random() + .5)) {
                                var coin = Bytes.Coin.generateRandom();
                                Bytes.GameBoard.placeAtRandom(coin);
                            }
                            else {
                                if (!Math.floor(Math.random() + .5)) {
                                    var slowPlayer = new Bytes.SlowPlayer();
                                    Bytes.GameBoard.placeAtRandom(slowPlayer);
                                }
                                else {
                                    var fastPlayer = new Bytes.FastPlayer();
                                    Bytes.GameBoard.placeAtRandom(fastPlayer);
                                }
                            }
                            console.log("Coins on board: " + Bytes.Coin.coinsActive);
                        }
                    }
                }
            }
            Bytes.GameBoard.draw();
            Bytes.GUI.draw();
        };
        Game.hiScore = 0;
        Game.isRunning = false;
        // TODO: Move this to item randomizer class
        Game.coinCounter = 0;
        return Game;
    })();
    Bytes.Game = Game;
})(Bytes || (Bytes = {}));
var Bytes;
(function (Bytes) {
    var Canvas = (function () {
        function Canvas() {
        }
        Canvas.init = function (el) {
            Canvas.el = el;
            el.height = Canvas.height;
            el.width = Canvas.width;
            Canvas.context = el.getContext("2d");
        };
        Canvas.fill = function (color) {
            Canvas.context.beginPath();
            Canvas.context.rect(0, 0, Canvas.width, Canvas.height);
            Canvas.context.fillStyle = color;
            Canvas.context.fill();
        };
        Canvas.fillRect = function (x, y, w, h, color) {
            Canvas.context.beginPath();
            Canvas.context.fillStyle = color;
            Canvas.context.fillRect(x, y, w, h);
        };
        Canvas.drawRect = function (x, y, w, h, color) {
            Canvas.context.beginPath();
            Canvas.context.lineWidth = 1;
            Canvas.context.strokeStyle = color;
            Canvas.context.rect(x, y, w, h);
            Canvas.context.stroke();
        };
        Canvas.width = 640;
        Canvas.height = 320;
        return Canvas;
    })();
    Bytes.Canvas = Canvas;
})(Bytes || (Bytes = {}));
var Bytes;
(function (Bytes) {
    var Buttons = (function () {
        function Buttons() {
        }
        Buttons.init = function () {
            Buttons.start = document.querySelector("#start");
            Buttons.pause = document.querySelector("#pause");
            Buttons.reset = document.querySelector("#reset");
            Buttons.start.onclick = Controls.onClickPlay;
            Buttons.pause.onclick = Controls.onClickPause;
            Buttons.reset.onclick = Controls.onClickReset;
        };
        return Buttons;
    })();
    Bytes.Buttons = Buttons;
    var GUI = (function () {
        function GUI() {
        }
        GUI.init = function () {
            GUI.header = document.querySelector("header");
            GUI.score = document.querySelector("#score");
            GUI.lives = document.querySelector("#lives");
            GUI.build = document.querySelector("#build");
            GUI.build.innerText = "Build: " + window['version'];
        };
        GUI.draw = function () {
            GUI.lives.innerText = Bytes.Game.isRunning
                ? "Lives: " + Bytes.Game.player1.lives
                : "Press Start";
            GUI.score.innerText = Bytes.Game.isRunning
                ? "Score: " + Bytes.Game.player1.points
                : "Hi Score: " + Bytes.Game.hiScore;
        };
        return GUI;
    })();
    Bytes.GUI = GUI;
    var Controls = (function () {
        function Controls() {
        }
        Controls.init = function () {
            GUI.init();
            Buttons.init();
        };
        Controls.onClickPlay = function () {
            Bytes.Game.start();
        };
        Controls.onClickPause = function () {
            Bytes.Game.togglePause();
        };
        Controls.onClickReset = function () {
            Bytes.Game.reset();
        };
        Controls.onKeyUp = function (ev) {
            Controls.lastKeyPressed = ev.keyCode;
        };
        Controls.processInput = function () {
            if (Controls.lastKeyPressed) {
                switch (Controls.lastKeyPressed) {
                    case 38:
                        if (Bytes.Game.player1.direction != Bytes.Direction.DOWN) {
                            Bytes.Game.player1.direction = Bytes.Direction.UP;
                        }
                        break;
                    case 40:
                        if (Bytes.Game.player1.direction != Bytes.Direction.UP) {
                            Bytes.Game.player1.direction = Bytes.Direction.DOWN;
                        }
                        break;
                    case 37:
                        if (Bytes.Game.player1.direction != Bytes.Direction.RIGHT) {
                            Bytes.Game.player1.direction = Bytes.Direction.LEFT;
                        }
                        break;
                    case 39:
                        if (Bytes.Game.player1.direction != Bytes.Direction.LEFT) {
                            Bytes.Game.player1.direction = Bytes.Direction.RIGHT;
                        }
                        break;
                }
                Controls.lastKeyPressed = null;
            }
        };
        Controls.lastKeyPressed = null;
        return Controls;
    })();
    Bytes.Controls = Controls;
})(Bytes || (Bytes = {}));
var Bytes;
(function (Bytes) {
    var GameObject = (function () {
        function GameObject() {
        }
        GameObject.prototype.handleCollision = function (object) {
        };
        GameObject.prototype.draw = function () {
        };
        return GameObject;
    })();
    Bytes.GameObject = GameObject;
    var GameEvent = (function () {
        function GameEvent() {
        }
        return GameEvent;
    })();
    Bytes.GameEvent = GameEvent;
    (function (ScreenEdge) {
        ScreenEdge[ScreenEdge["NORTH"] = 0] = "NORTH";
        ScreenEdge[ScreenEdge["SOUTH"] = 1] = "SOUTH";
        ScreenEdge[ScreenEdge["EAST"] = 2] = "EAST";
        ScreenEdge[ScreenEdge["WEST"] = 3] = "WEST";
    })(Bytes.ScreenEdge || (Bytes.ScreenEdge = {}));
    var ScreenEdge = Bytes.ScreenEdge;
    (function (Direction) {
        Direction[Direction["UP"] = 0] = "UP";
        Direction[Direction["DOWN"] = 1] = "DOWN";
        Direction[Direction["LEFT"] = 2] = "LEFT";
        Direction[Direction["RIGHT"] = 3] = "RIGHT";
        Direction[Direction["NONE"] = 4] = "NONE";
    })(Bytes.Direction || (Bytes.Direction = {}));
    var Direction = Bytes.Direction;
    var Position = (function () {
        function Position(x, y) {
            this.X = x;
            this.Y = y;
        }
        Position.copy = function (position) {
            return new Position(position.X, position.Y);
        };
        return Position;
    })();
    Bytes.Position = Position;
    (function (Speed) {
        Speed[Speed["SLOW"] = 0] = "SLOW";
        Speed[Speed["NORMAL"] = 1] = "NORMAL";
        Speed[Speed["FAST"] = 2] = "FAST";
    })(Bytes.Speed || (Bytes.Speed = {}));
    var Speed = Bytes.Speed;
})(Bytes || (Bytes = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bytes;
(function (Bytes) {
    var SlowPlayerEvent = (function (_super) {
        __extends(SlowPlayerEvent, _super);
        function SlowPlayerEvent() {
            _super.apply(this, arguments);
        }
        return SlowPlayerEvent;
    })(Bytes.GameEvent);
    Bytes.SlowPlayerEvent = SlowPlayerEvent;
    var SlowPlayer = (function (_super) {
        __extends(SlowPlayer, _super);
        function SlowPlayer() {
            _super.call(this);
            this.color = "#3366FF";
            this.index = SlowPlayer.itemsIndex;
            ++SlowPlayer.itemsIndex;
            ++SlowPlayer.itemsActive;
        }
        SlowPlayer.prototype.handleCollision = function (snake) {
            snake.setSpeed(Bytes.Speed.SLOW);
            this.destroy();
        };
        SlowPlayer.prototype.draw = function () {
            if (this.position) {
                var x = (this.position.X * Bytes.GameBoard.blockSize) + 2;
                var y = (this.position.Y * Bytes.GameBoard.blockSize) + 2;
                var size = Bytes.GameBoard.blockSize - 4;
                Bytes.Canvas.drawRect(x, y, size, size, this.color);
            }
        };
        SlowPlayer.prototype.destroy = function () {
            Bytes.GameBoard.removeObjectAt(this.position);
            delete SlowPlayer.instances[this.index];
            --SlowPlayer.itemsActive;
        };
        SlowPlayer.instances = {};
        SlowPlayer.itemsIndex = 0;
        SlowPlayer.itemsActive = 0;
        return SlowPlayer;
    })(Bytes.GameObject);
    Bytes.SlowPlayer = SlowPlayer;
    var FastPlayer = (function (_super) {
        __extends(FastPlayer, _super);
        function FastPlayer() {
            _super.call(this);
            this.color = "#3366FF";
            this.index = SlowPlayer.itemsIndex;
            ++SlowPlayer.itemsIndex;
            ++SlowPlayer.itemsActive;
        }
        FastPlayer.prototype.handleCollision = function (snake) {
            snake.setSpeed(Bytes.Speed.FAST);
            this.destroy();
        };
        FastPlayer.prototype.draw = function () {
            if (this.position) {
                var x = (this.position.X * Bytes.GameBoard.blockSize) + 2;
                var y = (this.position.Y * Bytes.GameBoard.blockSize) + 2;
                var size = Bytes.GameBoard.blockSize - 4;
                Bytes.Canvas.drawRect(x, y, size, size, this.color);
            }
        };
        FastPlayer.prototype.destroy = function () {
            Bytes.GameBoard.removeObjectAt(this.position);
            delete SlowPlayer.instances[this.index];
            --SlowPlayer.itemsActive;
        };
        FastPlayer.instances = {};
        FastPlayer.itemsIndex = 0;
        FastPlayer.itemsActive = 0;
        return FastPlayer;
    })(Bytes.GameObject);
    Bytes.FastPlayer = FastPlayer;
    var Coin = (function (_super) {
        __extends(Coin, _super);
        function Coin(value) {
            _super.call(this);
            this.value = value;
            this.index = Coin.coinsIndex;
            ++Coin.coinsIndex;
            ++Coin.coinsActive;
        }
        Coin.generateRandom = function () {
            return new Coin(Coin.values[Math.floor(Math.random() * Coin.values.length)]);
        };
        Coin.prototype.handleCollision = function (snake) {
            snake.points += this.value;
            snake.maxLength += 8;
            this.destroy();
        };
        Coin.prototype.draw = function () {
            if (this.position) {
                var x = (this.position.X * Bytes.GameBoard.blockSize) + (Bytes.GameBoard.blockSize / 2);
                var y = (this.position.Y * Bytes.GameBoard.blockSize) + (Bytes.GameBoard.blockSize / 2);
                var r = (Bytes.GameBoard.blockSize / 2) - 1;
                Bytes.Canvas.context.beginPath();
                Bytes.Canvas.context.arc(x, y, r, 0, 2 * Math.PI, false);
                Bytes.Canvas.context.strokeStyle = "#FFFF00";
                Bytes.Canvas.context.fillStyle = "#CCCC00";
                Bytes.Canvas.context.stroke();
                Bytes.Canvas.context.fill();
            }
        };
        Coin.prototype.destroy = function () {
            Bytes.GameBoard.removeObjectAt(this.position);
            delete Coin.instances[this.index];
            --Coin.coinsActive;
        };
        Coin.values = [200, 600, 800, 1000, 2000];
        Coin.instances = {};
        Coin.coinsIndex = 0;
        Coin.coinsActive = 0;
        return Coin;
    })(Bytes.GameObject);
    Bytes.Coin = Coin;
})(Bytes || (Bytes = {}));
var Bytes;
(function (Bytes) {
    var SnakeSegment = (function (_super) {
        __extends(SnakeSegment, _super);
        function SnakeSegment(position) {
            _super.call(this);
            this.color = "#04B404";
            this.position = position;
        }
        SnakeSegment.prototype.draw = function () {
            var boardX = (this.position.X * Bytes.GameBoard.blockSize);
            var boardY = (this.position.Y * Bytes.GameBoard.blockSize);
            var size = Bytes.GameBoard.blockSize;
            Bytes.Canvas.fillRect(boardX, boardY, size, size, this.color);
        };
        SnakeSegment.prototype.handleCollision = function (snake) {
            snake.die();
        };
        return SnakeSegment;
    })(Bytes.GameObject);
    Bytes.SnakeSegment = SnakeSegment;
    var Snake = (function (_super) {
        __extends(Snake, _super);
        function Snake(position) {
            _super.call(this, position);
            this.speed = Bytes.Speed.NORMAL;
            this.skipNextTurn = false;
            this.hitDetected = false;
            this.isAlive = false;
            this.hiScore = 0;
            this.points = 0;
            this.lives = 5;
            this.segments = [];
            this.maxLength = 8;
            this.isAlive = true;
            this.position = position;
            this.segments[0] = this;
            Bytes.GameBoard.placeObject(this, position);
        }
        Snake.prototype.onHitScreenEdge = function (edge) {
            this.die();
        };
        Snake.prototype.die = function () {
            this.hitDetected = true;
            this.hiScore = this.points > this.hiScore
                ? this.points
                : this.hiScore;
            Bytes.Game.hiScore = this.hiScore > Bytes.Game.hiScore
                ? this.hiScore
                : Bytes.Game.hiScore;
            if (this.lives == 0) {
                this.isAlive = false;
                return Bytes.Game.reset();
            }
            this.lives -= 1;
            this.destroy();
            this.position = new Bytes.Position(0, 0);
            this.direction = Bytes.Direction.NONE;
        };
        Snake.prototype.setSpeed = function (speed) {
            this.speed = speed;
            this.skipNextTurn = (speed === Bytes.Speed.SLOW);
        };
        Snake.prototype.processTurn = function () {
            if (!this.isAlive) {
                return;
            }
            // Skip every other clock tick unless moving fast
            if (this.speed != Bytes.Speed.FAST && Bytes.Game.clock.tick == Bytes.ClockTick.ODD) {
                return;
            }
            // Skip 3 clock ticks if moving slow
            if (this.speed == Bytes.Speed.SLOW && Bytes.Game.clock.tick == Bytes.ClockTick.EVEN) {
                this.skipNextTurn = !this.skipNextTurn;
                if (this.skipNextTurn) {
                    return;
                }
            }
            this.hitDetected = false;
            var isMoving = true;
            var oldPos = Bytes.Position.copy(this.position);
            var pos = Bytes.Position.copy(this.position);
            switch (this.direction) {
                case Bytes.Direction.UP:
                    pos.Y -= 1;
                    break;
                case Bytes.Direction.DOWN:
                    pos.Y += 1;
                    break;
                case Bytes.Direction.LEFT:
                    pos.X -= 1;
                    break;
                case Bytes.Direction.RIGHT:
                    pos.X += 1;
                    break;
                case Bytes.Direction.NONE:
                    isMoving = false;
            }
            if (isMoving) {
                if (pos.X < 0) {
                    this.onHitScreenEdge(Bytes.ScreenEdge.WEST);
                }
                else if (pos.Y < 0) {
                    this.onHitScreenEdge(Bytes.ScreenEdge.NORTH);
                }
                else if (pos.X == Bytes.GameBoard.width) {
                    this.onHitScreenEdge(Bytes.ScreenEdge.SOUTH);
                }
                else if (pos.Y == Bytes.GameBoard.height) {
                    this.onHitScreenEdge(Bytes.ScreenEdge.SOUTH);
                }
                if (Bytes.GameBoard.grid[pos.X][pos.Y]) {
                    var object = Bytes.GameBoard.grid[pos.X][pos.Y];
                    object.handleCollision(this);
                }
            }
            if (!this.isAlive) {
                this.destroy();
            }
            else if (!this.hitDetected) {
                this.updateBoard(pos);
            }
        };
        Snake.prototype.updateBoard = function (pos) {
            var lastPosition = Bytes.Position.copy(this.position);
            for (var i = 0, ii = this.segments.length; i != ii; i++) {
                var segment = this.segments[i];
                var newPosition = (i == 0)
                    ? pos
                    : lastPosition;
                lastPosition = segment.position;
                Bytes.GameBoard.moveObject(segment, newPosition);
            }
            if (this.segments.length <= this.maxLength) {
                var newSegment = new SnakeSegment(lastPosition);
                this.segments.push(newSegment);
                Bytes.GameBoard.placeObject(newSegment, lastPosition);
            }
        };
        Snake.prototype.destroy = function () {
            for (var i = 0, ii = this.segments.length; i != ii; i++) {
                Bytes.GameBoard.removeObjectAt(this.segments[i].position);
            }
            this.segments = [this];
            this.maxLength = 8;
        };
        return Snake;
    })(SnakeSegment);
    Bytes.Snake = Snake;
})(Bytes || (Bytes = {}));
var Bytes;
(function (Bytes) {
    (function (ClockType) {
        ClockType[ClockType["TIMED"] = 0] = "TIMED";
        ClockType[ClockType["INFINITE"] = 1] = "INFINITE";
    })(Bytes.ClockType || (Bytes.ClockType = {}));
    var ClockType = Bytes.ClockType;
    (function (ClockTick) {
        ClockTick[ClockTick["EVEN"] = 0] = "EVEN";
        ClockTick[ClockTick["ODD"] = 1] = "ODD";
    })(Bytes.ClockTick || (Bytes.ClockTick = {}));
    var ClockTick = Bytes.ClockTick;
    var Timer = (function () {
        function Timer(interval, duration, elaspedHandler) {
            this.tick = ClockTick.EVEN;
            this.onElapsed = function () { console.log("No clock event"); };
            this.interval = interval;
            this.duration = duration;
            this.onElapsed = elaspedHandler;
            this.type = (duration == 0) ? ClockType.INFINITE : ClockType.TIMED;
        }
        Timer.prototype._onElapsed = function () {
            if (this.isPaused) {
                return;
            }
            this.tick = (this.tick === ClockTick.EVEN)
                ? ClockTick.ODD
                : ClockTick.EVEN;
            this.onElapsed();
            if (this.type == ClockType.TIMED) {
                this.stop();
            }
        };
        Timer.prototype.start = function () {
            this.isRunning = true;
            this.handle = (this.type == ClockType.INFINITE)
                ? window.setInterval(this._onElapsed.bind(this), this.interval)
                : window.setTimeout(this._onElapsed.bind(this), this.interval);
        };
        Timer.prototype.stop = function () {
            if (this.type == ClockType.INFINITE) {
                window.clearInterval(this.handle);
            }
            else {
                window.clearTimeout(this.handle);
            }
            this.isRunning = false;
        };
        Timer.prototype.pause = function () {
            this.isPaused = true;
        };
        Timer.prototype.resume = function () {
            this.isPaused = false;
        };
        return Timer;
    })();
    Bytes.Timer = Timer;
})(Bytes || (Bytes = {}));
//# sourceMappingURL=bytes.js.map