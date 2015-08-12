module Bytes {

    export class Buttons {

        static start: HTMLButtonElement;
        static pause: HTMLButtonElement;
        static reset: HTMLButtonElement;

        static init() {
            
            Buttons.start = <HTMLButtonElement>document.querySelector("#start");
            Buttons.pause = <HTMLButtonElement>document.querySelector("#pause");
            Buttons.reset = <HTMLButtonElement>document.querySelector("#reset");

            Buttons.start.onclick = Controls.onClickPlay;
            Buttons.pause.onclick = Controls.onClickPause;
            Buttons.reset.onclick = Controls.onClickReset;
        }
    }

    export class GUI {

        static header: HTMLElement;            
        static lives: HTMLElement; 
        static points: HTMLElement;
        static build: HTMLElement;

        static init() {

            GUI.header = <HTMLElement>document.querySelector("header");
            GUI.points = <HTMLElement>document.querySelector("#points");
            GUI.lives = <HTMLElement>document.querySelector("#lives");
            GUI.build = <HTMLElement>document.querySelector("#build");
            GUI.build.innerText = "Build: " + window['version'];
        }

        static draw() {

            GUI.lives.innerText = Game.isRunning
                ? "Lives: " + Game.player1.lives
                : "Press Start";

            GUI.points.innerText = Game.isRunning
                ? "Points: " + Game.player1.points
                : "Hi Score: " + Game.player1.hiScore;            
        }
    }

    export class Controls {

        static init() {

            GUI.init();
            Buttons.init();
        }        

        static onClickPlay() {

            Game.start();
        }

        static onClickPause() {

            Game.togglePause();
        }

        static onClickReset() {

            Game.reset();
        }

        static lastKeyPressed: number = null;
        static onKeyUp(ev: KeyboardEvent) {

            Controls.lastKeyPressed = ev.keyCode;
        }

        static processInput() {

            if (Controls.lastKeyPressed) {

                switch (Controls.lastKeyPressed) {

                    case 38:
                        if (Game.player1.direction != Direction.DOWN) {
                            Game.player1.direction = Direction.UP;
                        }
                        break;

                    case 40:
                        if (Game.player1.direction != Direction.UP) {
                            Game.player1.direction = Direction.DOWN;
                        }
                        break;

                    case 37:
                        if (Game.player1.direction != Direction.RIGHT) {
                            Game.player1.direction = Direction.LEFT;
                        }
                        break;

                    case 39:
                        if (Game.player1.direction != Direction.LEFT) {
                            Game.player1.direction = Direction.RIGHT;
                        }
                        break;
                }

                Controls.lastKeyPressed = null;
            }
        }
    }
}