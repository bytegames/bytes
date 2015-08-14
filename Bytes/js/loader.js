var Bytes;
(function (Bytes) {
    var Loader = (function () {
        function Loader() {
        }
        Loader.init = function () {
            Loader.counter = Loader.files.length;
            Loader.files.forEach(Loader.loadFile);
        };
        Loader.onLoadFile = function () {
            Loader.files.length && Loader.loadFile(Loader.files.shift());
        };
        Loader.loadFile = function (filename) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = filename + "?v=" + Loader.version;
            script.onload = Loader.onLoadFile;
            document.body.appendChild(script);
        };
        Loader.version = window['version'].replace(/\/| |:|(A|P)M/g, "");
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
        return Loader;
    })();
    Bytes.Loader = Loader;
})(Bytes || (Bytes = {}));
Bytes.Loader.init();
//# sourceMappingURL=loader.js.map