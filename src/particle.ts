import type {Drawable, Position} from "./base.ts";

export class Particle implements Drawable {
    constructor(
        public position: Position,
        public radius: number,
        public pinned = false
    ) {
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#00ffcc";
        ctx.fill();
        ctx.closePath();
    }
}