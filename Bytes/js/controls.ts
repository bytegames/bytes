module Bytes {

    export class Buttons {

        static play: HTMLButtonElement;
        static pause: HTMLButtonElement;
        static reset: HTMLButtonElement;

        static init() {
            
            Buttons.play = <HTMLButtonElement>document.querySelector("#play");
            Buttons.pause = <HTMLButtonElement>document.querySelector("#pause");
            Buttons.reset = <HTMLButtonElement>document.querySelector("#reset");

            Buttons.play.onclick = Controls.onClickPlay;
            Buttons.pause.onclick = Controls.onClickPause;
            Buttons.reset.onclick = Controls.onClickReset;
        }
    }

    export class GUI {

        static header: HTMLElement;            
        static lives: HTMLElement; 
        
        static init() {

            GUI.header = <HTMLElement>document.querySelector("header");
            GUI.lives = <HTMLElement>document.querySelector("#lives");
        }

        static draw() {

            GUI.lives.innerText = Game.isRunning
                ? "Lives: " + Game.player1.lives
                : "Press Start";
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

            Game.pause();
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