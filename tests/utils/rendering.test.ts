import { interpolate } from "~/utils/rendering";

describe("rendering", () => {
  describe("interpolate", () => {
    it("should determine the midpoint", () => {
      const points = interpolate(
        new PIXI.Point(0, 0),
        new PIXI.Point(10, 10),
        2
      );

      expect(points).toEqual([
        { x: 0, y: 0 },
        { x: 5, y: 5 },
        { x: 10, y: 10 },
      ]);
    });
  });
});
