module Bytes {

    export class Loader {

        static version: string = window['version'].replace(/\/| |:|(A|P)M/g, "");

        static files: string[] = [
            
            "js/types.js",
            "js/gameboard.js",
            "js/controls.js",
            "js/canvas.js",
            "js/timer.js",
            "js/snake.js",
            "js/items.js",
            "js/game.js"
        ];

        static init() {
                
            Loader.loadNext();
        }

        static loadNext() {

            Loader.files.length && Loader.loadFile(Loader.files.shift());
        }

        static loadFile(filename: string) {

            var script: HTMLScriptElement = document.createElement("script");
            script.type = "text/javascript";
            script.src = filename + "?v=" + Loader.version;
            script.onload = Loader.loadNext;
            document.body.appendChild(script);
        }
    }    
}

Bytes.Loader.init();