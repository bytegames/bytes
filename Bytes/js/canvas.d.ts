declare module Bytes {
    class Canvas {
        static width: number;
        static height: number;
        static el: HTMLCanvasElement;
        static context: CanvasRenderingContext2D;
        static init(el: HTMLCanvasElement): void;
        static fill(color: string): void;
        static fillRect(x: number, y: number, w: number, h: number, color: string): void;
        static drawRect(x: number, y: number, w: number, h: number, color: string): void;
    }
}
