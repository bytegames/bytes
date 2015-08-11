declare module Bytes {
    class Buttons {
        static play: HTMLButtonElement;
        static pause: HTMLButtonElement;
        static reset: HTMLButtonElement;
        static init(): void;
    }
    class GUI {
        static header: HTMLElement;
        static lives: HTMLElement;
        static init(): void;
        static draw(): void;
    }
    class Controls {
        static init(): void;
        static onClickPlay(): void;
        static onClickPause(): void;
        static onClickReset(): void;
        static lastKeyPressed: number;
        static onKeyUp(ev: KeyboardEvent): void;
        static processInput(): void;
    }
}
