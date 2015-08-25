var Bytes;
(function (Bytes) {
    var Client;
    (function (Client) {
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
        Client.Buttons = Buttons;
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
                GUI.lives.innerText = Client.Game.isRunning
                    ? "Lives: " + Client.Game.player.lives
                    : "Press Start";
                GUI.score.innerText = Client.Game.isRunning
                    ? "Score: " + Client.Game.player.points
                    : "Hi Score: " + Client.Game.hiScore;
            };
            return GUI;
        })();
        Client.GUI = GUI;
        var Controls = (function () {
            function Controls() {
            }
            Controls.init = function () {
                GUI.init();
                Buttons.init();
            };
            Controls.onClickPlay = function () {
                Client.Game.start();
            };
            Controls.onClickPause = function () {
                Client.Game.togglePause();
            };
            Controls.onClickReset = function () {
                Client.Game.reset();
            };
            Controls.onKeyUp = function (ev) {
                Controls.lastKeyPressed = ev.keyCode;
            };
            Controls.processInput = function () {
                if (Controls.lastKeyPressed) {
                    switch (Controls.lastKeyPressed) {
                        case 38:
                            if (Client.Game.player.direction != Bytes.Direction.DOWN) {
                                Client.Game.player.direction = Bytes.Direction.UP;
                            }
                            break;
                        case 40:
                            if (Client.Game.player.direction != Bytes.Direction.UP) {
                                Client.Game.player.direction = Bytes.Direction.DOWN;
                            }
                            break;
                        case 37:
                            if (Client.Game.player.direction != Bytes.Direction.RIGHT) {
                                Client.Game.player.direction = Bytes.Direction.LEFT;
                            }
                            break;
                        case 39:
                            if (Client.Game.player.direction != Bytes.Direction.LEFT) {
                                Client.Game.player.direction = Bytes.Direction.RIGHT;
                            }
                            break;
                    }
                    Controls.lastKeyPressed = null;
                }
            };
            Controls.lastKeyPressed = null;
            return Controls;
        })();
        Client.Controls = Controls;
    })(Client = Bytes.Client || (Bytes.Client = {}));
})(Bytes || (Bytes = {}));
//# sourceMappingURL=controls.js.map