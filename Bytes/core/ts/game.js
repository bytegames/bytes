var Bytes;
(function (Bytes) {
    var GameResolutions = (function () {
        function GameResolutions() {
        }
        GameResolutions.vga = { width: 640, height: 480 };
        GameResolutions.svga = { width: 800, height: 600 };
        GameResolutions.xga = { width: 1024, height: 768 };
        GameResolutions.sxga = { width: 800, height: 600 };
        GameResolutions.default = GameResolutions.svga;
        return GameResolutions;
    })();
    Bytes.GameResolutions = GameResolutions;
    var GameIndex = (function () {
        function GameIndex() {
        }
        Object.defineProperty(GameIndex, "next", {
            // Get next id
            get: function () {
                for (var i in GameIndex.index) {
                    if (GameIndex.index[i]) {
                        return parseInt(i);
                    }
                }
                return parseInt(i) + 1;
            },
            enumerable: true,
            configurable: true
        });
        // Add game to index
        GameIndex.add = function (game) {
            game.id = GameIndex.next;
            GameIndex.index[game.id] = game;
        };
        // All game instances
        GameIndex.index = { 0: Game };
        return GameIndex;
    })();
    Bytes.GameIndex = GameIndex;
    var Game = (function () {
        function Game() {
            this.resolution = GameResolutions.default;
            this.width = GameResolutions.default.width;
            this.height = GameResolutions.default.height;
            this.hiScore = 0;
            this.isRunning = false;
            this.players = {};
            console.log("Game created");
        }
        Game.prototype.init = function () {
            if (this.isRunning) {
                console.log("Game must be stopped before calling init()");
                return;
            }
            this.board = new Bytes.GameBoard();
            this.objectList = new Bytes.ObjectList();
            this.clock = new Bytes.Timer(Bytes.GameDifficulty.DIFFICULT, 0, this.onClockTick);
            // Player 1 top left, facing right
            this.players[Bytes.PlayerNumber.ONE] = new Bytes.Player(Bytes.PlayerNumber.ONE, { X: 0, Y: 0 });
            this.players[Bytes.PlayerNumber.ONE].direction = Bytes.Direction.RIGHT;
            // Player 2 bottom right, facing left
            this.players[Bytes.PlayerNumber.TWO] = new Bytes.Player(Bytes.PlayerNumber.TWO, { X: this.width, Y: this.height });
            this.players[Bytes.PlayerNumber.ONE].direction = Bytes.Direction.LEFT;
            //Canvas.init(<HTMLCanvasElement>document.querySelector("canvas"));
            //Controls.init();
            //Game.htmlBody = <HTMLBodyElement>document.querySelector("body");
            //Game.htmlBody.onkeyup = Controls.onKeyUp;
            this.ready();
        };
        Game.prototype.ready = function () {
            // Game.player1.direction = Direction.RIGHT;
            // GUI.draw();
        };
        Game.prototype.start = function () {
            if (this.isRunning) {
                return;
            }
            if (this.clock.isPaused) {
                return this.togglePause();
            }
            this.isRunning = true;
            this.clock.start();
        };
        Game.prototype.togglePause = function () {
            if (this.clock.isPaused) {
                this.clock.resume();
                this.isRunning = true;
            }
            else {
                this.clock.pause();
                this.isRunning = false;
            }
        };
        Game.prototype.reset = function () {
            this.clock && this.clock.stop();
            this.isRunning = false;
            this.ready();
        };
        Game.prototype.onClockTick = function () {
            // Controls.processInput();
            // Game.player1.processTurn();
            if (this.clock.tick == Bytes.ClockTick.EVEN) {
                // TODO: Move this to item randomizer class
                Game.coinCounter += 1;
                if (Game.coinCounter >= 20) {
                    Game.coinCounter = 0;
                    if (!Math.floor(Math.random() + .5)) {
                        var probability = (Bytes.Coin.coinsActive + .5) / 5;
                        if (!Math.floor(Math.random() + probability)) {
                            if (!Math.floor(Math.random() + .5)) {
                                var coin = Bytes.Coin.generateRandom();
                                this.board.placeAtRandom(coin);
                            }
                            else {
                                if (!Math.floor(Math.random() + .5)) {
                                    var slowPlayer = new Bytes.SlowPlayer();
                                    this.board.placeAtRandom(slowPlayer);
                                }
                                else {
                                    var fastPlayer = new Bytes.FastPlayer();
                                    this.board.placeAtRandom(fastPlayer);
                                }
                            }
                            console.log("Coins on board: " + Bytes.Coin.coinsActive);
                        }
                    }
                }
            }
            // GameBoard.draw();
            // GUI.draw();
        };
        // TODO: Move this to item randomizer class
        Game.coinCounter = 0;
        return Game;
    })();
    Bytes.Game = Game;
})(Bytes || (Bytes = {}));
//# sourceMappingURL=game.js.map