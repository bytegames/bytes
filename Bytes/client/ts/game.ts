namespace Bytes {

    export namespace Client {




        export class Player extends Snake {

            constructor(position: Position) {

                super(position);
            }
        }

        export class Game {

            public static width: number = 640;
            public static height: number = 320;

            //static htmlBody: HTMLBodyElement;
            static clock: Timer;

            static player: Player;

            static players: { [index: number]: Player };

            static hiScore: number = 0;
            static isRunning: boolean = false;

            static board: GameBoard;

            static init() {

                if (Game.isRunning) {
                    console.log("Game must be stopped before calling init()");
                    return;
                }

                Game.board = new GameBoard();
                Game.clock = new Timer(GameDifficulty.DIFFICULT, 0, Game.onClockTick);

                Game.players[1] = new Snake({ X: 0, Y: 0 });

                //Canvas.init(<HTMLCanvasElement>document.querySelector("canvas"));
                //Controls.init();

                //Game.htmlBody = <HTMLBodyElement>document.querySelector("body");
                //Game.htmlBody.onkeyup = Controls.onKeyUp;

                Game.ready();
            }

            static ready() {
                       

            
                // Game.player1.direction = Direction.RIGHT;

            

                // GUI.draw();
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
                    // GUI.draw();
                }
            }

            static reset() {

                Game.clock && Game.clock.stop();
                Game.isRunning = false;
                Game.ready();
            }

            // TODO: Move this to item randomizer class
            static coinCounter = 0;

            static onClockTick() {

                // Controls.processInput();
                // Game.player1.processTurn();

                if (Game.clock.tick == ClockTick.EVEN) {

                    // TODO: Move this to item randomizer class
                    Game.coinCounter += 1;
                    if (Game.coinCounter >= 20) {
                        Game.coinCounter = 0;

                        if (!Math.floor(Math.random() + .5)) {

                            var probability = (Coin.coinsActive + .5) / 5;
                            if (!Math.floor(Math.random() + probability)) {

                                if (!Math.floor(Math.random() + .5)) {
                                    var coin = Coin.generateRandom();
                                    // Game.board.placeAtRandom(coin);
                                }
                                else {

                                    if (!Math.floor(Math.random() + .5)) {
                                        var slowPlayer = new SlowPlayer();
                                        // GameBoard.placeAtRandom(slowPlayer);
                                    }
                                    else {
                                        var fastPlayer = new FastPlayer();
                                        // GameBoard.placeAtRandom(fastPlayer);
                                    }
                                }

                                console.log("Coins on board: " + Coin.coinsActive);
                            }
                        }
                    }
                }

               // GameBoard.draw();
                GUI.draw();
            }
        }

    }
}