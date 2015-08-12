module Bytes {

    export class Canvas {

        public static width: number = 640;
        public static height: number = 320;

        public static el: HTMLCanvasElement;
        public static context: CanvasRenderingContext2D;

        public static init(el: HTMLCanvasElement) {

            Canvas.el = el;
            el.height = Canvas.height;
            el.width = Canvas.width;

            Canvas.context = el.getContext("2d");
        }

        public static fill(color: string) {

            Canvas.context.beginPath();
            Canvas.context.rect(0, 0, Canvas.width, Canvas.height);
            Canvas.context.fillStyle = color;
            Canvas.context.fill();            
        }

        public static fillRect(x: number, y: number, w: number, h: number, color: string) {

            Canvas.context.beginPath();
            Canvas.context.fillStyle = color;
            Canvas.context.fillRect(x, y, w, h);            
        }

        public static drawRect(x: number, y: number, w: number, h: number, color: string) {

            Canvas.context.beginPath();
            Canvas.context.lineWidth = 1;
            Canvas.context.strokeStyle = color;
            Canvas.context.rect(x, y, w, h);
            Canvas.context.stroke();
        }
    }
}