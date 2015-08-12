var Bytes;
(function (Bytes) {
    var GameDifficulty = (function () {
        function GameDifficulty() {
        }
        GameDifficulty.EASY = 800;
        GameDifficulty.MEDIUM = 400;
        GameDifficulty.DIFFICULT = 200;
        return GameDifficulty;
    })();
    var Game = (function () {
        function Game() {
            Bytes.Canvas.init(document.querySelector("canvas"));
            Bytes.Controls.init();
            Game.htmlBody = document.querySelector("body");
            Game.htmlBody.onkeyup = Bytes.Controls.onKeyUp;
            Bytes.GameBoard.init();
            Bytes.GameBoard.draw();
            Bytes.GUI.draw();
        }
        Game.start = function () {
            if (Game.isRunning) {
                return;
            }
            Game.isRunning = true;
            Game.player1 = new Bytes.Snake({ X: 0, Y: 0 });
            Game.player1.direction = Bytes.Direction.RIGHT;
            Game.clock = new Bytes.Timer(GameDifficulty.DIFFICULT, 0, Game.processTurn);
            Game.clock.start();
        };
        Game.pause = function () {
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
            Game.isRunning = false;
            Game.clock && Game.clock.stop();
            Bytes.GameBoard.init();
        };
        Game.processTurn = function () {
            console.log("process turn");
            Bytes.Controls.processInput();
            Game.player1.processTurn();
            // TODO: Move this to item randomizer class
            Game.coinCounter += 1;
            if (Game.coinCounter == 12) {
                Game.coinCounter = 0;
                console.log("Coins on board: " + Bytes.Coin.instances.length);
                if (Bytes.Coin.instances.length < 6) {
                    var coin = Bytes.Coin.generateRandom();
                    Bytes.GameBoard.placeAtRandom(coin);
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
    var game = new Game();
})(Bytes || (Bytes = {}));
//# sourceMappingURL=game.js.map