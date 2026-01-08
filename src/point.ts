export class Point {
    x: number;
    y: number;
    oldX: number;
    oldY: number;
    isPinned: boolean;

    constructor(x: number, y: number, isPinned: boolean)
    constructor(x: number, y: number, oldX: number, oldY: number, isPinned: boolean)
    constructor(x: number, y: number, arg3: number | boolean, oldY?: number, isPinned?: boolean) {
        this.x = x;
        this.y = y;
        this.oldX = !arg3 || typeof arg3 === "boolean" ? x : arg3;
        this.oldY = oldY ?? y;
        this.isPinned = typeof arg3 === "boolean" ? arg3 : isPinned ?? false;
    }

    update(gravity: number, friction: number, pinnedPos?: { x: number; y: number }) {
        if (this.isPinned) {
            if (!!pinnedPos) {
                this.x = pinnedPos.x;
                this.y = pinnedPos.y;
            }
            return;
        }

        const vx = this.x - this.oldX;
        const vy = this.y - this.oldY;

        this.oldX = this.x;
        this.oldY = this.y;

        this.x += vx * friction;
        this.y += (vy + gravity) * friction;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
    }
}