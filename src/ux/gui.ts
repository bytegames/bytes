import { Game } from '../game.js'

export abstract class GUI {

    static header: HTMLElement            
    static lives: HTMLElement 
    static score: HTMLElement
    static build: HTMLElement

    static init() {

        GUI.header = <HTMLElement>document.querySelector("header")
        GUI.score = <HTMLElement>document.querySelector("#score")
        GUI.lives = <HTMLElement>document.querySelector("#lives")
        GUI.build = <HTMLElement>document.querySelector("#build")
    }

    static draw() {

        GUI.lives.innerText = Game.is_running
            ? "Lives: " + Game.player_one.lives
            : "Press Start"

        GUI.score.innerText = Game.is_running
            ? "Score: " + Game.player_one.points
            : "Hi Score: " + Game.hi_score            
    }
}