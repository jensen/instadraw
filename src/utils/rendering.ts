export const interpolate = (from, to, detail = 3) => {
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
