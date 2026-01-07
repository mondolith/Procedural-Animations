import type {Drawable, Position} from "./base.ts";
import {Particle} from "./particle.ts";

export class Chain implements Drawable {
    particles: Particle[];

    constructor(
        public position: Position,
        public segments: number,
        public particleRadius: number,
        public spacing: number = particleRadius * 2
    ) {
        this.particles = [];
        for (let i = 0; i < segments; i++) {
            this.particles.push(new Particle(position.copy().down(i * spacing), particleRadius, i === 0));
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.particles.forEach(particle => particle.draw(ctx));
    }
}