import type {Vector} from "./position.ts";

export class State {
    private _mousePosition: Vector;

    constructor(canvas: HTMLCanvasElement) {
        this._mousePosition = {x: 0, y: 0};
        canvas.addEventListener("mousemove", event => this._mousePosition = {x: event.x, y: event.y});
    }

    get mousePosition() {
        return this._mousePosition;
    }
}