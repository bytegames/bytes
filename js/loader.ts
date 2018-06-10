module Bytes {

    export class Loader {

        // Override server cache by adding version to filename as query string
        static version: string = window['version'].replace(/\/| |:|(A|P)M/g, "");

        // Required game JS files
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

        // Track number of files loaded
        static counter: number = 0;

        // Initialize Loader
        static init() {

            Loader.counter = Loader.files.length;
            Loader.files.forEach(Loader.loadFile);
        }
        
        // Generate a <script> tag for each file
        static loadFile(filename: string) {

            var script: HTMLScriptElement = document.createElement("script");
            script.type = "text/javascript";
            script.src = filename + "?v=" + Loader.version;
            script.onload = Loader.onLoadFile;
            document.body.appendChild(script);
        }

        // Initialize game when all files loaded
        static onLoadFile() {

            --Loader.counter;
            Loader.counter || Game.init();
        }
    }    
}

Bytes.Loader.init();