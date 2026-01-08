export interface Vector {
    x: number;
    y: number;
}

export function center(p1: Vector, p2: Vector): Vector {
    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
    };
}