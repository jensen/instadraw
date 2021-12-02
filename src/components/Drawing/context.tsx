import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from "react";
import type { Application, Container, Point, Graphics } from "pixi.js";
import { decode } from "base64-arraybuffer";
import useMouseMove from "./hooks/useMouseMove";
import { interpolateDirect } from "~/utils/rendering";

export const WIDTH = 1080 / 2;
export const HEIGHT = 1350 / 2;

const ZINDEX = {
  LAYER: 1,
  BACKGROUND: 0,
};

let PIXI: any;

if (typeof window !== "undefined") {
  PIXI = (window as WindowWithPIXI).PIXI;
}

interface IDrawingContext {
  renderer?: React.MutableRefObject<Application | undefined>;
  canvas?: React.MutableRefObject<HTMLCanvasElement | undefined>;
  brush: number | null;
  setBrush: React.Dispatch<React.SetStateAction<number>>;
  color: string | null;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  startDrawing: (event: MouseEvent) => void;
  stopDrawing: (event: MouseEvent) => void;
  layer: number;
  addLayer: () => void;
  removeLayer: () => void;
  removeLayers: () => void;
}

const nop = (v?: any) => null;

const DrawingContext = React.createContext<IDrawingContext>({
  brush: null,
  setBrush: nop,
  color: null,
  setColor: nop,
  startDrawing: nop,
  stopDrawing: nop,
  layer: -1,
  addLayer: () => null,
  removeLayer: nop,
  removeLayers: nop,
});

const applicationConfig = {
  width: WIDTH,
  height: HEIGHT,
  antialias: true,
  backgroundColor: 0xffffff,
  backgroundAlpha: 0,
};

interface IDrawingProviderProps {
  backgrounds: any[];
  saveRef: React.MutableRefObject<() => void>;
  children: React.ReactNode;
}

export function DrawingProvider(props: IDrawingProviderProps) {
  const canvasRef = useRef<HTMLCanvasElement>();
  const rendererRef = useRef<Application>();
  const previousPointRef = useRef<Point>();
  const canvas = canvasRef ? { canvas: canvasRef } : {};
  const renderer = rendererRef ? { renderer: rendererRef } : {};

  const [brush, setBrush] = useState<number>(6);
  const [color, setColor] = useState<string>("000000");
  const [isDrawing, setIsDrawing] = useState(false);
  const [layer, setLayer] = useState(-1);

  useEffect(() => {
    rendererRef.current = new PIXI.Application({
      ...applicationConfig,
      view: canvasRef.current,
    });

    if (!rendererRef.current) {
      throw new Error("No renderer created");
    }

    const backgrounds = new PIXI.Container();

    for (const bg of props.backgrounds) {
      backgrounds.addChild(new PIXI.Sprite(PIXI.Texture.from(bg.image)));
    }

    const layers = new PIXI.Container();

    layers.width = WIDTH;
    layers.height = HEIGHT;

    rendererRef.current.stage.addChildAt(backgrounds, ZINDEX.BACKGROUND);
    rendererRef.current.stage.addChildAt(layers, ZINDEX.LAYER);

    return () => {
      if (rendererRef.current) {
        rendererRef.current.destroy();
      }
    };
  }, []);

  useMouseMove(
    canvasRef.current,
    useCallback(
      (event: MouseEvent) => {
        if (isDrawing && rendererRef.current) {
          const to = new PIXI.Point(event.offsetX, event.offsetY);

          const layers = rendererRef.current.stage.getChildAt(
            ZINDEX.LAYER
          ) as Container;
          const graphics = layers.getChildAt(
            layers.children.length - 1
          ) as Graphics;

          graphics.beginFill(parseInt(color, 16));

          const draw = (x: number, y: number) =>
            graphics.drawCircle(x, y, brush);

          if (previousPointRef.current) {
            interpolateDirect(draw, previousPointRef.current, to);
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

  const startDrawing = (event: MouseEvent) => {
    addLayer();
    setIsDrawing(true);
  };

  const stopDrawing = (event: MouseEvent) => {
    previousPointRef.current = undefined;
    setIsDrawing(false);
  };

  const addLayer = () => {
    const layers = rendererRef.current?.stage.getChildAt(
      ZINDEX.LAYER
    ) as Container;

    const next = layers.children.length;

    const graphics = new PIXI.Graphics();
    graphics.name = `layer${new Date().getTime()}`;

    layers.addChildAt(graphics, next);

    setLayer((prev) => prev + 1);
  };

  const removeLayer = () => {
    const layers = rendererRef.current?.stage.getChildAt(
      ZINDEX.LAYER
    ) as Container;

    const index = layers.children.length - 1;

    if (index < 0) return;

    layers.removeChildAt(index);

    setLayer(layers.children.length - 1);
  };

  const removeLayers = () => {
    const layers = rendererRef.current?.stage.getChildAt(
      ZINDEX.LAYER
    ) as Container;

    layers.removeChildren();
    setLayer(-1);
  };

  useEffect(() => {
    props.saveRef.current = () => {
      const layers = rendererRef.current?.stage.getChildAt(
        ZINDEX.LAYER
      ) as Container;

      const frame = new PIXI.Graphics();

      frame.lineStyle(1, 0xe6e6e6);
      frame.drawRect(0, 0, WIDTH, HEIGHT);

      layers.addChild(frame);

      return decode(
        rendererRef.current?.renderer.plugins.extract
          .base64(layers)
          .replace(/^data:image\/\w+;base64,/, "")
      );
    };
  });

  return (
    <DrawingContext.Provider
      value={{
        ...renderer,
        ...canvas,
        brush,
        setBrush,
        color,
        setColor,
        startDrawing,
        stopDrawing,
        layer,
        addLayer,
        removeLayer,
        removeLayers,
      }}
    >
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

export function useColor(color?: string) {
  const context = useContext(DrawingContext);

  if (!context) throw new Error("Must useColor inside of a DrawingProvider");

  return {
    current: context.color,
    active: context.color === color,
    select: () => context.setColor(color || "ffffff"),
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

export function useUndo() {
  const context = useContext(DrawingContext);

  if (!context) throw new Error("Must useLayers inside of a DrawingProvider");

  const layers = context.renderer?.current?.stage.getChildAt(
    ZINDEX.LAYER
  ) as Container;

  return {
    undo: context.removeLayer,
    clear: context.removeLayers,
    canUndo: context.layer >= 0 || false,
    canClear: context.layer >= 0 || false,
  };
}
