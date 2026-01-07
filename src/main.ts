import {Chain} from "./chain.ts";
import {Position} from "./base.ts";

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
const ctx = canvas.getContext('2d')!;
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const chain = new Chain(Position.centered(canvas), 5, 25);

function animate() {
    clear();
    drawFrame();
    requestAnimationFrame(animate);
}
animate();

function drawFrame() {
    chain.draw(ctx);
}
