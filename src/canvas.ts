import {center, type Vector} from "./math-utils.ts";

export class Canvas {
    private mousePosition: Vector = {x: 0, y: 0};
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;

    constructor()
    constructor(selector: string)
    constructor(canvas: HTMLCanvasElement)
    constructor(canvasOrSelector: HTMLCanvasElement | string = "#canvas") {
        this.canvas = typeof canvasOrSelector === "string"
            ? document.querySelector<HTMLCanvasElement>(canvasOrSelector)!
            : canvasOrSelector;

        this.ctx = this.canvas.getContext("2d")!;
        this.canvas.addEventListener("mousemove", event => this.mousePosition = {x: event.x, y: event.y});
    }

    get mouse() {
        return this.mousePosition;
    }

    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }

    get strokeStyle() {
        return this.ctx.strokeStyle;
    }

    set strokeStyle(value) {
        this.ctx.strokeStyle = value;
    }

    withStrokeStyle(value: string | CanvasGradient | CanvasPattern) {
        this.strokeStyle = value;
        return this;
    }

    get lineWidth() {
        return this.ctx.lineWidth;
    }

    set lineWidth(value) {
        this.ctx.lineWidth = value;
    }

    withLineWidth(value: number) {
        this.lineWidth = value;
        return this;
    }

    get lineCap() {
        return this.ctx.lineCap;
    }

    set lineCap(value) {
        this.ctx.lineCap = value;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    beginPath() {
        this.ctx.beginPath();
        return this;
    }

    closePath() {
        this.ctx.closePath();
    }

    drawCurve(points: Vector[], options?: {
        strokeStyle?: string | CanvasGradient | CanvasPattern;
        lineWidth?: number;
        lineCap?: CanvasLineCap;
    }) {
        if (points.length < 2) return;
        this.beginPath();

        this.moveTo(points[0]);
        this.lineTo(center(points[0], points[1]));

        for (let i = 1; i < points.length - 1; i++) {
            this.quadraticCurveTo(points[i], center(points[i], points[i + 1]));
        }

        this.lineTo(points[points.length - 1]);

        if (options) {
            if (options.strokeStyle) {
                this.strokeStyle = "#00ffcc";
            }
            if (options.lineWidth) {
                this.lineWidth = 3;
            }
            this.lineCap = options.lineCap ?? "round";
        }

        this.stroke();

        this.closePath();
    }

    moveTo(x: number, y: number): Canvas
    moveTo(point: Vector): Canvas
    moveTo(pointOrX: Vector | number, _y?: number): Canvas {
        const {x, y} = this.getVector(pointOrX, _y);
        this.ctx.moveTo(x, y);
        return this;
    }

    lineTo(x: number, _y?: number): Canvas
    lineTo(point: Vector): Canvas
    lineTo(pointOrX: Vector | number, _y?: number): Canvas {
        const {x, y} = this.getVector(pointOrX, _y);
        this.ctx.lineTo(x, y);
        return this;
    }

    quadraticCurveTo(controlPoint: Vector, endPoint: Vector) {
        this.ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y);
        return this;
    }

    stroke() {
        this.ctx.stroke();
        return this;
    }

    private getVector(vectorOrX: Vector | number, y: number | undefined): Vector {
        return typeof vectorOrX === "number" ? {x: vectorOrX, y: y!} : vectorOrX;
    }
}