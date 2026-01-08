import {Point} from "./point.ts";
import type {Canvas} from "./canvas.ts";

export class Rope {
    points: Point[] = [];
    segmentLength: number;

    constructor(startX: number, startY: number, count: number, spacing: number) {
        this.segmentLength = spacing;
        for (let i = 0; i < count; i++) {
            this.points.push(new Point(startX, startY + i * spacing, i === 0));
        }
    }

    update(options: {
        gravity: number;
        friction: number;
        stiffness: number;
        pinnedPosition?: { x: number; y: number; };
        floorY?: number;
    }) {
        const {gravity, friction, stiffness, pinnedPosition, floorY} = options;
        this.points.forEach(point => point.update(gravity, friction, pinnedPosition));
        for (let i = 0; i < stiffness; i++) {
            this.updateSegmentLengthConstraint();
            if (floorY) {
                this.updateFloorCollisionConstraint(floorY);
            }
        }
    }

    private updateSegmentLengthConstraint() {
        for (let i = 0; i < this.points.length - 1; i++) {
            const p1 = this.points[i];
            const p2 = this.points[i + 1];

            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance === 0) return;
            const difference = (this.segmentLength - distance) / distance;

            const offsetX = dx * difference * 0.5;
            const offsetY = dy * difference * 0.5;

            if (!p1.isPinned) {
                p1.x -= offsetX;
                p1.y -= offsetY;
            }

            if (!p2.isPinned) {
                p2.x += offsetX;
                p2.y += offsetY;
            }
        }
    }

    private updateFloorCollisionConstraint(floorY: number) {
        this.points.forEach(point => {
            if (point.y >= floorY) {
                point.y = floorY;
            }
        });
    }

    draw(canvas: Canvas, options?: { floorY?: number; }) {
        if (options) {
            const {floorY} = options;
            if (floorY) {
                canvas.beginPath()
                    .moveTo(0, floorY + 3)
                    .lineTo(canvas.width, floorY + 3)
                    .withStrokeStyle("#009dff")
                    .withLineWidth(3)
                    .stroke()
                    .closePath();
            }
        }
        canvas.drawCurve(this.points, {strokeStyle: "#00ffcc", lineWidth: 3});
    }
}
