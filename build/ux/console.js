import { Game } from '../game.js';
import { GUI } from './gui.js';
export class Console {
    static init() {
        Console.buttons.start = document.querySelector("#start");
        Console.buttons.pause = document.querySelector("#pause");
        Console.buttons.reset = document.querySelector("#reset");
        Console.buttons.start.onclick = () => { Game.start(); };
        Console.buttons.pause.onclick = () => { Game.pause(); };
        Console.buttons.reset.onclick = () => { Game.reset(); };
        GUI.init();
    }
}
Console.buttons = {
    start: null,
    pause: null,
    reset: null
};
