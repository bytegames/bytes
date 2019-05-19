import { Game } from '../game.js'
import { GUI } from './gui.js'

interface IButtons {
    start: HTMLButtonElement
    pause: HTMLButtonElement
    reset: HTMLButtonElement
}

export class Console {

    static buttons: IButtons = {
        start: null,
        pause: null,
        reset: null
    }
    
    static init() {
        
        Console.buttons.start = <HTMLButtonElement>document.querySelector("#start")
        Console.buttons.pause = <HTMLButtonElement>document.querySelector("#pause")
        Console.buttons.reset = <HTMLButtonElement>document.querySelector("#reset")

        Console.buttons.start.onclick = () => { Game.start() }
        Console.buttons.pause.onclick = () => { Game.pause() }
        Console.buttons.reset.onclick = () => { Game.reset() }

        GUI.init()
    }        
}