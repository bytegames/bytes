import { ClockTick, Timer, Direction } from './types/index.js';
import { Coin, Snake, SlowPlayer, FastPlayer } from './objects/index.js';
import { Board, Canvas, Console, Controls, GUI } from './ux/index.js';
var GameDifficulty;
(function (GameDifficulty) {
    GameDifficulty[GameDifficulty["EASY"] = 300] = "EASY";
    GameDifficulty[GameDifficulty["MEDIUM"] = 150] = "MEDIUM";
    GameDifficulty[GameDifficulty["DIFFICULT"] = 50] = "DIFFICULT";
})(GameDifficulty || (GameDifficulty = {}));
export class Game {
    static init() {
        Canvas.init(document.querySelector("canvas"));
        let body = document.querySelector("body");
        body.onkeyup = Controls.on_key_up;
        Game.ready();
    }
    static ready() {
        Console.init();
        Board.init();
        Board.draw();
        GUI.init();
        GUI.draw();
        Game.player_one = new Snake({ X: 0, Y: 0 });
        Game.player_one.direction = Direction.RIGHT;
        Game.player_two = new Snake({ X: 10, Y: 10 });
        Game.player_two.direction = Direction.RIGHT;
        Game.clock = new Timer(GameDifficulty.DIFFICULT, 0, Game.on_clock_tick);
    }
    static start() {
        if (Game.is_running) {
            return;
        }
        if (Game.clock.is_paused) {
            return Game.pause();
        }
        Game.is_running = true;
        Game.clock.start();
    }
    static pause() {
        if (Game.clock.is_paused) {
            Game.is_running = true;
            return Game.clock.resume();
        }
        Game.clock.pause();
        Game.is_running = false;
        GUI.draw();
    }
    static reset() {
        Game.clock && Game.clock.stop();
        Game.is_running = false;
        Game.ready();
    }
    static on_clock_tick() {
        Controls.process_input();
        Game.player_one.process_turn();
        Game.player_two.process_turn();
        if (Game.clock.tick == ClockTick.EVEN) {
            // TODO: Move this to item randomizer class
            Game.coinCounter += 1;
            if (Game.coinCounter >= 2) {
                Game.coinCounter = 0;
                if (!Math.floor(Math.random() + .5)) {
                    var probability = (Coin.coins_active + .5) / 5;
                    if (!Math.floor(Math.random() + probability)) {
                        if (!Math.floor(Math.random() + .8)) {
                            var coin = Coin.create_random();
                            Board.place_at_random(coin);
                        }
                        else {
                            if (!Math.floor(Math.random() + .5)) {
                                var slowPlayer = new SlowPlayer();
                                // Board.place_at_random(slowPlayer)
                            }
                            else {
                                var fastPlayer = new FastPlayer();
                                Board.place_at_random(fastPlayer);
                            }
                        }
                    }
                }
            }
        }
        Board.draw();
        GUI.draw();
    }
}
Game.hi_score = 0;
Game.is_running = false;
// TODO: Move this to item randomizer class
Game.coinCounter = 0;
Game.init();
