import type { Point } from "pixi.js";

export const interpolate = (from: Point, to: Point) => {
  const points = [from];

  const distancex = Math.abs(to.x - from.x);
  const distancey = Math.abs(to.y - from.y);
  const detail = Math.ceil(
    Math.sqrt(distancex * distancex + distancey * distancey)
  );

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

export const interpolateDirect = (cb, from: Point, to: Point) => {
  const distancex = Math.abs(to.x - from.x);
  const distancey = Math.abs(to.y - from.y);
  const detail = Math.ceil(
    Math.sqrt(distancex * distancex + distancey * distancey)
  );

  for (let i = 0; i <= detail; i++) {
    cb(
      from.x + (to.x - from.x) * (i / detail),
      from.y + (to.y - from.y) * (i / detail),
      10
    );
  }
};
