import { Game } from '../game.js'

export abstract class GUI {

    static header: HTMLElement
    static toggleTwoPlayers: HTMLInputElement
    static playerOneLives: HTMLElement
    static playerTwoLives: HTMLElement
    static playerOneScore: HTMLElement
    static playerTwoScore: HTMLElement
    static build: HTMLElement

    static init() {

        GUI.header = <HTMLElement>document.querySelector("header")
        GUI.toggleTwoPlayers = <HTMLInputElement>document.getElementById("toggleTwoPlayers")
        GUI.playerOneScore = <HTMLElement>document.querySelector("#player-one-score")
        GUI.playerOneLives = <HTMLElement>document.querySelector("#player-one-lives")
        GUI.playerTwoScore = <HTMLElement>document.querySelector("#player-two-score")
        GUI.playerTwoLives = <HTMLElement>document.querySelector("#player-two-lives")
        GUI.build = <HTMLElement>document.querySelector("#build")

        GUI.setOnePlayer();
        GUI.enableToggleTwoPlayers();        
    }

    static disableToggleTwoPlayers(){
        GUI.toggleTwoPlayers.disabled = true;
    }

    static enableToggleTwoPlayers(){
        GUI.toggleTwoPlayers.disabled = false;
    }

    static isPlayerTwoEnabled(): boolean {
        return GUI.toggleTwoPlayers.checked;
    }

    static setOnePlayer(){
        GUI.toggleTwoPlayers.checked = false
    }

    static setTwoPlayer(){
        GUI.toggleTwoPlayers.checked = true
    }

    static displayPlayerOne() {
        GUI.playerOneLives.innerText = Game.is_running
            ? "Player One Lives: " + Game.player_one.lives
            : "Press Start"

        GUI.playerOneScore.innerText = Game.is_running
            ? "Player One Score: " + Game.player_one.points
            : "Hi Score: " + Game.hi_score
    }

    static displayPlayerTwo() {
        GUI.playerTwoLives.innerText = Game.is_running
            ? "Player Two Lives: " + Game.player_two.lives
            : ""

        GUI.playerTwoScore.innerText = Game.is_running
            ? "Player Two Score: " + Game.player_two.points
            : ""
    }
    static draw() {

        if (GUI.isPlayerTwoEnabled() && Game.isPlayerTwoExists() ) {
            this.displayPlayerOne();
            this.displayPlayerTwo();
        }
        else {
            this.displayPlayerOne();
        }

    }
}