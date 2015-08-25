var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bytes;
(function (Bytes) {
    var Client;
    (function (Client) {
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player(position) {
                _super.call(this, position);
            }
            return Player;
        })(Bytes.Snake);
        Client.Player = Player;
        var Game = (function () {
            function Game() {
            }
            Game.init = function () {
                if (Game.isRunning) {
                    console.log("Game must be stopped before calling init()");
                    return;
                }
                Game.board = new Client.GameBoard();
                Game.clock = new Bytes.Timer(Bytes.GameDifficulty.DIFFICULT, 0, Game.onClockTick);
                Game.players[1] = new Bytes.Snake({ X: 0, Y: 0 });
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
                                }
                                else {
                                    if (!Math.floor(Math.random() + .5)) {
                                        var slowPlayer = new Bytes.SlowPlayer();
                                    }
                                    else {
                                        var fastPlayer = new Bytes.FastPlayer();
                                    }
                                }
                                console.log("Coins on board: " + Bytes.Coin.coinsActive);
                            }
                        }
                    }
                }
                // GameBoard.draw();
                Client.GUI.draw();
            };
            Game.width = 640;
            Game.height = 320;
            Game.hiScore = 0;
            Game.isRunning = false;
            // TODO: Move this to item randomizer class
            Game.coinCounter = 0;
            return Game;
        })();
        Client.Game = Game;
    })(Client = Bytes.Client || (Bytes.Client = {}));
})(Bytes || (Bytes = {}));
//# sourceMappingURL=game.js.map