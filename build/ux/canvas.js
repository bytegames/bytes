export class Canvas {
    static init(el) {
        el.height = Canvas.height;
        el.width = Canvas.width;
        Canvas.context = el.getContext("2d");
    }
    static fill(color) {
        Canvas.context.beginPath();
        Canvas.context.rect(0, 0, Canvas.width, Canvas.height);
        Canvas.context.fillStyle = color;
        Canvas.context.fill();
    }
    static fill_rect(x, y, w, h, color) {
        Canvas.context.beginPath();
        Canvas.context.fillStyle = color;
        Canvas.context.fillRect(x, y, w, h);
    }
    static draw_rect(x, y, w, h, color) {
        Canvas.context.beginPath();
        Canvas.context.lineWidth = 1;
        Canvas.context.strokeStyle = color;
        Canvas.context.rect(x, y, w, h);
        Canvas.context.stroke();
    }
}
Canvas.width = 640;
Canvas.height = 400;
