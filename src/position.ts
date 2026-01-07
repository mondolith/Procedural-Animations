export interface Position {
    get vector(): Vector;

    get x(): number;

    get y(): number;

    copy(): Position;

    down(amount: number): Position;
}

export interface Vector {
    x: number;
    y: number;
}

export class StaticPosition implements Position {
    private readonly _x: number;
    private _y: number;

    constructor(x: number, y: number)
    constructor(vector: Vector)
    constructor(arg1: Vector | number, arg2?: number) {
        if (typeof arg1 === "number") {
            this._x = arg1;
            this._y = arg2!;
        } else {
            this._x = arg1.x;
            this._y = arg1.y;
        }
    }

    static centered(canvas: HTMLCanvasElement) {
        return new StaticPosition(canvas.width / 2, canvas.height / 2);
    }

    get vector(): Vector {
        return {x: this.x, y: this.y};
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    copy() {
        return new StaticPosition(this.vector);
    }

    down(amount: number) {
        this._y -= amount;
        return this;
    }
}

let mousePosition: Vector = {x: 0, y: 0};
let mouseMoveListenerAdded = false;

export function getMousePosition() {
    if (!mouseMoveListenerAdded) {
        const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
        if (!canvas) {
            return {x: 0, y: 0};
        }
        canvas.addEventListener("mousemove", event => mousePosition = {x: event.x, y: event.y});
        mouseMoveListenerAdded = true;
    }
    return mousePosition;
}
