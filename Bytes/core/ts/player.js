var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bytes;
(function (Bytes) {
    (function (PlayerNumber) {
        PlayerNumber[PlayerNumber["UNDEFINED"] = 0] = "UNDEFINED";
        PlayerNumber[PlayerNumber["ONE"] = 1] = "ONE";
        PlayerNumber[PlayerNumber["TWO"] = 2] = "TWO";
    })(Bytes.PlayerNumber || (Bytes.PlayerNumber = {}));
    var PlayerNumber = Bytes.PlayerNumber;
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(playerNumber, position) {
            _super.call(this, position);
            this.playerNumber = PlayerNumber.UNDEFINED;
        }
        Player.spawn = function (playerNumber, position) {
            // 
        };
        return Player;
    })(Bytes.Snake);
    Bytes.Player = Player;
})(Bytes || (Bytes = {}));
//# sourceMappingURL=player.js.map