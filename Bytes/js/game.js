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
            Game.clock.stop();
            Bytes.GameBoard.init();
        };
        Game.processTurn = function () {
            console.log("process turn");
            Bytes.GameBoard.draw();
            Bytes.Controls.processInput();
            Game.player1.processTurn();
            Bytes.GUI.draw();
        };
        Game.isRunning = false;
        return Game;
    })();
    Bytes.Game = Game;
    var game = new Game();
})(Bytes || (Bytes = {}));
//# sourceMappingURL=game.js.map