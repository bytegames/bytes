module Bytes {

    class GameDifficulty {

        static EASY: number = 800;
        static MEDIUM: number = 400;
        static DIFFICULT: number = 200;
    }
    
    export class Game {

        static htmlBody: HTMLBodyElement;
        static clock: Timer;
        static player1: Snake;

        static isRunning: boolean = false;

        constructor() {
            
            Canvas.init(<HTMLCanvasElement>document.querySelector("canvas"));
            Controls.init();

            Game.htmlBody = <HTMLBodyElement>document.querySelector("body");
            Game.htmlBody.onkeyup = Controls.onKeyUp;

            GameBoard.init();
            GameBoard.draw();
            
        }
      
        static start() {

            if (Game.isRunning) {
                return;
            }
                        
            Game.isRunning = true;

            Game.player1 = new Snake({ X: 0, Y: 0 });
            Game.player1.direction = Direction.RIGHT;

            Game.clock = new Timer(GameDifficulty.DIFFICULT, 0, Game.processTurn);
            Game.clock.start();
        }

        static pause() {

            if (Game.clock.isPaused) {
                Game.clock.resume();
                Game.isRunning = true;
            }
            else {
                Game.clock.pause();
                Game.isRunning = false;
                GUI.draw();
            }
        }

        static reset() {

            Game.isRunning = false;         
            Game.clock.stop();
            GameBoard.init();
        }

        static processTurn() {

            console.log("process turn");
            GameBoard.draw();

            Controls.processInput();
            Game.player1.processTurn();   
            
            GUI.draw();         
        }
    }

    var game = new Game();
}