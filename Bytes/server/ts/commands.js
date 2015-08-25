var Bytes;
(function (Bytes) {
    var Commands = (function () {
        function Commands() {
        }
        Commands.start = function () {
            Bytes.Game.start();
        };
        Commands.updatePlayerControl = function () {
        };
        return Commands;
    })();
    Bytes.Commands = Commands;
})(Bytes || (Bytes = {}));
//# sourceMappingURL=commands.js.map