import type { Point } from "pixi.js";

export const interpolate = (from: Point, to: Point, detail = 3) => {
  const points = [from];

  for (let i = 1; i < detail; i++) {
    points.push(
      new PIXI.Point(
        from.x + (to.x - from.x) * (i / detail),
        from.y + (to.y - from.y) * (i / detail)
      )
    );
  }

  points.push(to);

  return points;
};

export const interpolateDirect = (cb, from: Point, to: Point, detail = 3) => {
  for (let i = 0; i <= detail; i++) {
    cb(
      from.x + (to.x - from.x) * (i / detail),
      from.y + (to.y - from.y) * (i / detail),
      10
    );
  }
};
