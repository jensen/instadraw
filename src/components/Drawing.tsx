import React, { useState, useEffect, useRef } from "react";
import type { Application, Point } from "pixi.js";

import { interpolate } from "~/utils/rendering";

const colors = [
  "1abc9c",
  "2ecc71",
  "3498db",
  "9b59b6",
  "34495e",
  "f1c40f",
  "e67e22",
  "e74c3c",
  "ecf0f1",
  "95a5a6",
];

export default function Drawing() {
  const canvasRef = useRef<HTMLCanvasElement>();
  const pixiRef = useRef<Application>();
  const previousPaintRef = useRef<Point | null>(null);

  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState(colors[0]);

  useEffect(() => {
    pixiRef.current = new PIXI.Application({
      width: 512,
      height: 512,
      view: canvasRef.current,
      antialias: false,
    });

    return () => {
      if (pixiRef.current) {
        pixiRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const cb = (event: MouseEvent) => {
      if (drawing && pixiRef.current) {
        const to = new PIXI.Point(event.offsetX, event.offsetY);

        const graphics = new PIXI.Graphics();

        graphics.beginFill(`0x${color}`);

        if (previousPaintRef.current) {
          const points = interpolate(previousPaintRef.current, to);
          const length = points.length;

          for (let i = length - 1; i >= 0; i -= 1) {
            graphics.drawCircle(points[i].x, points[i].y, 10);
          }
        } else {
          graphics.drawCircle(to.x, to.y, 10);
        }

        graphics.endFill();

        pixiRef.current.stage.addChild(graphics);

        previousPaintRef.current = to;
      }
    };

    if (canvasRef.current) {
      canvasRef.current.addEventListener("mousemove", cb);
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousemove", cb);
      }
    };
  }, [drawing, color]);

  useEffect(() => {
    const cb = (event: MouseEvent) => {
      setDrawing(true);
    };

    if (canvasRef.current) {
      canvasRef.current.addEventListener("mousedown", cb);
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousedown", cb);
      }
    };
  }, []);

  React.useEffect(() => {
    const cb = (event: MouseEvent) => {
      previousPaintRef.current = null;
      setDrawing(false);
    };

    if (canvasRef.current) {
      canvasRef.current.addEventListener("mouseup", cb);
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mouseup", cb);
      }
    };
  }, []);

  return (
    <>
      <script src="https://pixijs.download/release/pixi.js" />
      <canvas ref={canvasRef} />
      <div style={{ display: "flex" }}>
        {colors.map((c) => (
          <div
            key={c}
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: `#${c}`,
              borderBottom: c === color ? "4px solid white" : "0",
            }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
    </>
  );
}
