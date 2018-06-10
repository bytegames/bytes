var Bytes;
(function (Bytes) {
    var Canvas = (function () {
        function Canvas() {
        }
        Canvas.init = function (el) {
            Canvas.el = el;
            el.height = Canvas.height;
            el.width = Canvas.width;
            Canvas.context = el.getContext("2d");
        };
        Canvas.fill = function (color) {
            Canvas.context.beginPath();
            Canvas.context.rect(0, 0, Canvas.width, Canvas.height);
            Canvas.context.fillStyle = color;
            Canvas.context.fill();
        };
        Canvas.fillRect = function (x, y, w, h, color) {
            Canvas.context.beginPath();
            Canvas.context.fillStyle = color;
            Canvas.context.fillRect(x, y, w, h);
        };
        Canvas.drawRect = function (x, y, w, h, color) {
            Canvas.context.beginPath();
            Canvas.context.lineWidth = 1;
            Canvas.context.strokeStyle = color;
            Canvas.context.rect(x, y, w, h);
            Canvas.context.stroke();
        };
        Canvas.width = 1200;
        Canvas.height = 600;
        return Canvas;
    })();
    Bytes.Canvas = Canvas;
})(Bytes || (Bytes = {}));
//# sourceMappingURL=canvas.js.map