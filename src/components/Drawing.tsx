import React from "react";

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
  const canvasRef = React.useRef<HTMLCanvasElement>();
  const pixiRef = React.useRef();
  const previousPaintRef = React.useRef<{ x: number; y: number } | null>(null);

  const [drawing, setDrawing] = React.useState(false);
  const [color, setColor] = React.useState(colors[0]);

  React.useEffect(() => {
    pixiRef.current = new PIXI.Application({
      width: 512,
      height: 512,
      view: canvasRef.current,
    });

    return () => {
      if (pixiRef.current) {
        pixiRef.current.destroy();
      }
    };
  }, []);

  React.useEffect(() => {
    const cb = (event: MouseEvent) => {
      if (drawing && pixiRef.current) {
        const graphics = new PIXI.Graphics();

        graphics.lineStyle(5, parseInt(color, 16), 1, 0.5, true);
        console.log(event);
        if (previousPaintRef.current) {
          graphics.moveTo(
            previousPaintRef.current.x,
            previousPaintRef.current.y
          );
          graphics.lineTo(event.offsetX, event.offsetY);
        } else {
          graphics.moveTo(event.offsetX, event.offsetY);
        }

        graphics.closePath();

        previousPaintRef.current = {
          x: event.offsetX,
          y: event.offsetY,
        };

        pixiRef.current.stage.addChild(graphics);
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

  React.useEffect(() => {
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
      setDrawing(false);
      previousPaintRef.current = null;
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
