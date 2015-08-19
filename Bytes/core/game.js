var Bytes;
(function (Bytes) {
    var Player = (function () {
        function Player() {
        }
        return Player;
    })();
    Bytes.Player = Player;
    var Game = (function () {
        function Game() {
        }
        Game.init = function () {
            if (Game.isRunning) {
                console.log("Game must be stopped before calling init()");
                return;
            }
            Game.board = new Bytes.GameBoard();
            Game.clock = new Bytes.Timer(Bytes.GameDifficulty.DIFFICULT, 0, Game.onClockTick);
            Game.player1 = new Bytes.Snake({ X: 0, Y: 0 });
            //Canvas.init(<HTMLCanvasElement>document.querySelector("canvas"));
            //Controls.init();
            //Game.htmlBody = <HTMLBodyElement>document.querySelector("body");
            //Game.htmlBody.onkeyup = Controls.onKeyUp;
            Game.ready();
        };
        Game.ready = function () {
            // Game.player1.direction = Direction.RIGHT;
            // GUI.draw();
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
            }
        };
        Game.reset = function () {
            Game.clock && Game.clock.stop();
            Game.isRunning = false;
            Game.ready();
        };
        Game.onClockTick = function () {
            // Controls.processInput();
            // Game.player1.processTurn();
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
                                Game.board.placeAtRandom(coin);
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
            GUI.draw();
        };
        Game.width = 640;
        Game.height = 320;
        Game.hiScore = 0;
        Game.isRunning = false;
        // TODO: Move this to item randomizer class
        Game.coinCounter = 0;
        return Game;
    })();
    Bytes.Game = Game;
})(Bytes || (Bytes = {}));
//# sourceMappingURL=game.js.map