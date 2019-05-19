import { Game } from '../game.js';
export class GUI {
    static init() {
        GUI.header = document.querySelector("header");
        GUI.score = document.querySelector("#score");
        GUI.lives = document.querySelector("#lives");
        GUI.build = document.querySelector("#build");
    }
    static draw() {
        GUI.lives.innerText = Game.is_running
            ? "Lives: " + Game.player_one.lives
            : "Press Start";
        GUI.score.innerText = Game.is_running
            ? "Score: " + Game.player_one.points
            : "Hi Score: " + Game.hi_score;
    }
}
