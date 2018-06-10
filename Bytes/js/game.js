var Bytes;
(function (Bytes) {
    var GameDifficulty = /** @class */ (function () {
        function GameDifficulty() {
        }
        GameDifficulty.EASY = 300;
        GameDifficulty.MEDIUM = 150;
        GameDifficulty.DIFFICULT = 50;
        return GameDifficulty;
    }());
    var Game = /** @class */ (function () {
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
    }());
    Bytes.Game = Game;
})(Bytes || (Bytes = {}));
