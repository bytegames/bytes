var Bytes;
(function (Bytes) {
    var Loader = (function () {
        function Loader() {
        }
        // Initialize Loader
        Loader.init = function () {
            Loader.counter = Loader.files.length;
            Loader.files.forEach(Loader.loadFile);
        };
        // Generate a <script> tag for each file
        Loader.loadFile = function (filename) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = filename + "?v=" + Loader.version;
            script.onload = Loader.onLoadFile;
            document.body.appendChild(script);
        };
        // Initialize game when all files loaded
        Loader.onLoadFile = function () {
            --Loader.counter;
            Loader.counter || Bytes.Game.init();
        };
        // Override server cache by adding version to filename as query string
        Loader.version = window['version'].replace(/\/| |:|(A|P)M/g, "");
        // Required game JS files
        Loader.files = [
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
        Loader.counter = 0;
        return Loader;
    })();
    Bytes.Loader = Loader;
})(Bytes || (Bytes = {}));
Bytes.Loader.init();
//# sourceMappingURL=loader.js.map