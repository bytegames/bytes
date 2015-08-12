var Bytes;
(function (Bytes) {
    var GameDifficulty = (function () {
        function GameDifficulty() {
        }
        GameDifficulty.EASY = 600;
        GameDifficulty.MEDIUM = 300;
        GameDifficulty.DIFFICULT = 100;
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
            Game.clock = new Bytes.Timer(GameDifficulty.DIFFICULT, 0, Game.processTurn);
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
        Game.processTurn = function () {
            console.log("process turn");
            Bytes.Controls.processInput();
            Game.player1.processTurn();
            // TODO: Move this to item randomizer class
            Game.coinCounter += 1;
            console.log("Coin counter: " + Game.coinCounter);
            if (Game.coinCounter >= 20) {
                Game.coinCounter = 0;
                if (!Math.floor(Math.random() + .5)) {
                    if (Bytes.Coin.instances.length < 6) {
                        var coin = Bytes.Coin.generateRandom();
                        Bytes.GameBoard.placeAtRandom(coin);
                        console.log("Coins on board: " + Bytes.Coin.instances.length);
                    }
                }
            }
            Bytes.GameBoard.draw();
            Bytes.GUI.draw();
        };
        Game.isRunning = false;
        // TODO: Move this to item randomizer class
        Game.coinCounter = 0;
        return Game;
    })();
    Bytes.Game = Game;
})(Bytes || (Bytes = {}));
Bytes.Game.init();
//# sourceMappingURL=game.js.map