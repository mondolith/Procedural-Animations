import {Rope} from "./rope.ts";
import {Canvas} from "./canvas.ts";

const canvas = new Canvas();

window.addEventListener('resize', canvas.resize);
canvas.resize();

function animate() {
    canvas.clear();
    drawFrame();
    requestAnimationFrame(animate);
}

const rope = new Rope(100, 200, 50, 10);

function drawFrame() {
    rope.update({gravity: 0.5, friction: 0.98, stiffness: 30, pinnedPosition: canvas.mouse});
    rope.draw(canvas);
}

animate();
