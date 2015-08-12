module Bytes {

    class GameDifficulty {

        static EASY: number = 600;
        static MEDIUM: number = 300;
        static DIFFICULT: number = 100;
    }
    
    export class Game {

        static htmlBody: HTMLBodyElement;
        static clock: Timer;
        static player1: Snake;

        static isRunning: boolean = false;

        static init() {
            
            Canvas.init(<HTMLCanvasElement>document.querySelector("canvas"));
            Controls.init();

            Game.htmlBody = <HTMLBodyElement>document.querySelector("body");
            Game.htmlBody.onkeyup = Controls.onKeyUp;              

            Game.ready();
        }              

        static ready() {

            GameBoard.init();
            GameBoard.draw();

            Game.player1 = new Snake({ X: 0, Y: 0 });
            Game.player1.direction = Direction.RIGHT;

            Game.clock = new Timer(GameDifficulty.DIFFICULT, 0, Game.processTurn);          
            
            GUI.draw();
        }

        static start() {

            if (Game.isRunning) {
                return;
            }

            if (Game.clock.isPaused) {
                return Game.togglePause();
            }
                        
            Game.isRunning = true;           
            Game.clock.start();
        }

        static togglePause() {

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
            
            Game.clock && Game.clock.stop();
            Game.isRunning = false;         
            Game.ready();            
        }

        // TODO: Move this to item randomizer class
        static coinCounter = 0;

        static processTurn() {

            console.log("process turn");

            Controls.processInput();
            Game.player1.processTurn();   
            
            // TODO: Move this to item randomizer class
            Game.coinCounter += 1;
            console.log("Coin counter: " + Game.coinCounter);            
            if (Game.coinCounter >= 20) {                                
                Game.coinCounter = 0;

                if (!Math.floor(Math.random() + .5)) {

                    if (Bytes.Coin.instances.length) {

                        if (!!Math.floor(Math.random() + ((10 - Bytes.Coin.instances.length) / 100))) {

                            var coin = Bytes.Coin.generateRandom();
                            Bytes.GameBoard.placeAtRandom(coin);
                            console.log("Coins on board: " + Bytes.Coin.instances.length);
                        }
                    }
                }                
            }

            GameBoard.draw();
            GUI.draw();         
        }
    }    
}

Bytes.Game.init();