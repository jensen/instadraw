import React, { useState, useEffect, useRef } from "react";
import type { Application, Point } from "pixi.js";

import { interpolateDirect } from "~/utils/rendering";

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

const sizes = Array.from(new Array(10)).map((_, index) => index + 1);

export default function Drawing() {
  const canvasRef = useRef<HTMLCanvasElement>();
  const pixiRef = useRef<Application>();
  const previousPaintRef = useRef<Point | null>(null);

  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState(colors[0]);
  const [size, setSize] = useState(sizes[3]);

  useEffect(() => {
    pixiRef.current = new PIXI.Application({
      width: 512,
      height: 512,
      view: canvasRef.current,
      antialias: true,
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

        const draw = (x: number, y: number) => graphics.drawCircle(x, y, size);

        if (previousPaintRef.current) {
          interpolateDirect(draw, previousPaintRef.current, to, 16);
        } else {
          draw(to.x, to.y);
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
      <div style={{ display: "flex" }}>
        {sizes.map((s) => (
          <div
            key={s}
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: `#${s}`,
              borderBottom: s === size ? "4px solid black" : "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => setSize(s)}
          >
            {s}
          </div>
        ))}
      </div>
    </>
  );
}
