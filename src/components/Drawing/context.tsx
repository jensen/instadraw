import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from "react";
import type { Application, Container, Point, Graphics } from "pixi.js";
import useMouseMove from "./hooks/useMouseMove";
import { interpolateDirect } from "~/utils/rendering";

const WIDTH = 1080 / 2;
const HEIGHT = 1350 / 2;

// const colors = [
//   "1abc9c",
//   "2ecc71",
//   "3498db",
//   "9b59b6",
//   "34495e",
//   "f1c40f",
//   "e67e22",
//   "e74c3c",
//   "ecf0f1",
//   "95a5a6",
// ];

interface IDrawingContext {
  canvas?: React.MutableRefObject<HTMLCanvasElement | undefined>;
  brush: number | null;
  setBrush: React.Dispatch<React.SetStateAction<number>>;
  color: string | null;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  startDrawing: () => void;
  stopDrawing: () => void;
}

const DrawingContext = React.createContext<IDrawingContext>({
  brush: null,
  setBrush: (value: React.SetStateAction<number>) => null,
  color: null,
  setColor: (value: React.SetStateAction<string>) => null,
  startDrawing: () => null,
  stopDrawing: () => null,
});

interface IDrawingProviderProps {
  children: React.ReactNode;
}

export function DrawingProvider(props: IDrawingProviderProps) {
  const canvasRef = useRef<HTMLCanvasElement>();
  const rendererRef = useRef<Application>();
  const previousPointRef = useRef<Point>();
  const canvas = canvasRef ? { canvas: canvasRef } : {};

  const [brush, setBrush] = useState<number>(6);
  const [color, setColor] = useState<string>("ffffff");
  const [isDrawing, setIsDrawing] = useState(false);

  const [layer, setLayer] = useState<number>(0);

  useMouseMove(
    canvasRef.current,
    useCallback(
      (event: MouseEvent) => {
        if (isDrawing && rendererRef.current) {
          const to = new PIXI.Point(event.offsetX, event.offsetY);

          const layers = rendererRef.current.stage.getChildAt(0) as Container;
          const graphics = layers.getChildAt(layer) as Graphics;

          graphics.beginFill(parseInt(color, 16));

          const draw = (x: number, y: number) =>
            graphics.drawCircle(x, y, brush);

          if (previousPointRef.current) {
            interpolateDirect(draw, previousPointRef.current, to, 64);
          } else {
            draw(to.x, to.y);
          }

          graphics.endFill();

          previousPointRef.current = to;
        }
      },
      [isDrawing, color, brush]
    )
  );

  useEffect(() => {
    rendererRef.current = new PIXI.Application({
      width: WIDTH,
      height: HEIGHT,
      view: canvasRef.current,
      antialias: false,
    });

    if (!rendererRef.current) {
      throw new Error("No renderer created");
    }

    const layers = new PIXI.Container();

    layers.width = WIDTH;
    layers.height = HEIGHT;

    layers.addChildAt(new PIXI.Graphics(), 0);

    rendererRef.current.stage.addChildAt(layers, 0);

    return () => {
      if (rendererRef.current) {
        rendererRef.current.destroy();
      }
    };
  }, []);

  const startDrawing = () => {
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    previousPointRef.current = undefined;
    setIsDrawing(false);
  };

  return (
    <DrawingContext.Provider
      value={{
        ...canvas,
        brush,
        setBrush,
        color,
        setColor,
        startDrawing,
        stopDrawing,
      }}
    >
      <script src="https://pixijs.download/release/pixi.js" />
      {props.children}
    </DrawingContext.Provider>
  );
}

export function useCanvas() {
  const context = useContext(DrawingContext);

  if (!context) throw new Error("Must useCanvas inside of a DrawingProvider");
  if (!context.canvas) throw new Error("No Canvas element");

  return context.canvas;
}

export function useBrush(size: number) {
  const context = useContext(DrawingContext);

  if (!context) throw new Error("Must useBrush inside of a DrawingProvider");

  return {
    active: context.brush === size,
    select: () => context.setBrush(size),
  };
}

export function useColor(color: string) {
  const context = useContext(DrawingContext);

  if (!context) throw new Error("Must useColor inside of a DrawingProvider");

  return {
    active: context.color === color,
    select: () => context.setColor(color),
  };
}

export function useDrawing() {
  const context = useContext(DrawingContext);

  if (!context) throw new Error("Must useDrawing inside of a DrawingProvider");

  return {
    startDrawing: context.startDrawing,
    stopDrawing: context.stopDrawing,
  };
}
