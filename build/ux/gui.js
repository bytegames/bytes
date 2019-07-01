import { Game } from '../game.js';
export class GUI {
    static init() {
        GUI.header = document.querySelector("header");
        GUI.toggleTwoPlayers = document.getElementById("toggleTwoPlayers");
        GUI.playerOneScore = document.querySelector("#player-one-score");
        GUI.playerOneLives = document.querySelector("#player-one-lives");
        GUI.playerTwoScore = document.querySelector("#player-two-score");
        GUI.playerTwoLives = document.querySelector("#player-two-lives");
        GUI.build = document.querySelector("#build");
        GUI.setOnePlayer();
        GUI.enableToggleTwoPlayers();
    }
    static disableToggleTwoPlayers() {
        GUI.toggleTwoPlayers.disabled = true;
    }
    static enableToggleTwoPlayers() {
        GUI.toggleTwoPlayers.disabled = false;
    }
    static isPlayerTwoEnabled() {
        return GUI.toggleTwoPlayers.checked;
    }
    static setOnePlayer() {
        GUI.toggleTwoPlayers.checked = false;
    }
    static setTwoPlayer() {
        GUI.toggleTwoPlayers.checked = true;
    }
    static displayPlayerOne() {
        GUI.playerOneLives.innerText = Game.is_running
            ? "Player One Lives: " + Game.player_one.lives
            : "Press Start";
        GUI.playerOneScore.innerText = Game.is_running
            ? "Player One Score: " + Game.player_one.points
            : "Hi Score: " + Game.hi_score;
    }
    static displayPlayerTwo() {
        GUI.playerTwoLives.innerText = Game.is_running
            ? "Player Two Lives: " + Game.player_two.lives
            : "";
        GUI.playerTwoScore.innerText = Game.is_running
            ? "Player Two Score: " + Game.player_two.points
            : "";
    }
    static draw() {
        if (GUI.isPlayerTwoEnabled() && Game.is_player_two_exists()) {
            this.displayPlayerOne();
            this.displayPlayerTwo();
        }
        else {
            this.displayPlayerOne();
        }
    }
}
