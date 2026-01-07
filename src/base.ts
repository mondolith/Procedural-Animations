export interface Drawable {
    draw(ctx: CanvasRenderingContext2D): void;
}

export class Position {
    constructor(
        public x: number,
        public y: number
    ) {
    }

    static centered(canvas: HTMLCanvasElement) {
        return new Position(canvas.width / 2, canvas.height / 2);
    }

    copy() {
        return new Position(this.x, this.y);
    }

    down(amount: number) {
        this.y -= amount;
        return this;
    }
}
