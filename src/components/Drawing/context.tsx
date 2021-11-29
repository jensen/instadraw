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

const WIDTH = 1080 / 2;
const HEIGHT = 1350 / 2;

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
  removeLayer: (index: number) => void;
  selectLayer: (index: number) => void;
  highlightLayer: (index: number) => void;
  unhighlightLayer: (index: number) => void;
  saveCanvas: () => ArrayBuffer;
}

const nop = (v?: any) => null;

const DrawingContext = React.createContext<IDrawingContext>({
  brush: null,
  setBrush: nop,
  color: null,
  setColor: nop,
  startDrawing: nop,
  stopDrawing: nop,
  layer: 0,
  addLayer: () => null,
  removeLayer: nop,
  selectLayer: nop,
  highlightLayer: nop,
  unhighlightLayer: nop,
  saveCanvas: nop,
});

const applicationConfig = {
  width: WIDTH,
  height: HEIGHT,
  antialias: false,
  backgroundColor: 0xffffff,
  backgroundAlpha: 0,
};

interface IDrawingProviderProps {
  children: React.ReactNode;
}

export function DrawingProvider(props: IDrawingProviderProps) {
  const canvasRef = useRef<HTMLCanvasElement>();
  const rendererRef = useRef<Application>();
  const previousPointRef = useRef<Point>();
  const canvas = canvasRef ? { canvas: canvasRef } : {};
  const renderer = rendererRef ? { renderer: rendererRef } : {};

  const [brush, setBrush] = useState<number>(6);
  const [color, setColor] = useState<string>("ffffff");
  const [isDrawing, setIsDrawing] = useState(false);

  const [layer, setLayer] = useState<number>(-1);

  useEffect(() => {
    rendererRef.current = new PIXI.Application({
      ...applicationConfig,
      view: canvasRef.current,
    });

    if (!rendererRef.current) {
      throw new Error("No renderer created");
    }

    const layers = new PIXI.Container();

    layers.width = WIDTH;
    layers.height = HEIGHT;

    const graphics = new PIXI.Graphics();
    graphics.name = `layer${new Date().getTime()}`;

    layers.addChildAt(graphics, 0);

    rendererRef.current.stage.addChildAt(layers, 0);

    setLayer(0);

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

          const layers = rendererRef.current.stage.getChildAt(0) as Container;
          const graphics = layers.getChildAt(layer || 0) as Graphics;

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
      [isDrawing, color, brush, layer]
    )
  );

  const startDrawing = (event: MouseEvent) => {
    setIsDrawing(true);
  };

  const stopDrawing = (event: MouseEvent) => {
    previousPointRef.current = undefined;
    setIsDrawing(false);
  };

  const addLayer = () => {
    const layers = rendererRef.current?.stage.getChildAt(0) as Container;

    const next = (layer || 0) + 1;

    const graphics = new PIXI.Graphics();
    graphics.name = `layer${new Date().getTime()}`;

    layers.addChildAt(graphics, next);

    setLayer(next);
  };

  const removeLayer = (index) => {
    const layers = rendererRef.current?.stage.getChildAt(0) as Container;

    const selected = index === layer ? layer - 1 : layer;

    layers.removeChildAt(index);

    setLayer(selected > 0 ? selected : 0);
  };

  const highlightLayer = (index: number) => {
    const layers = rendererRef.current?.stage.getChildAt(0) as Container;
    const current = layers.getChildAt(index) as Graphics;

    current.tint = 0xdddddd;
  };

  const unhighlightLayer = (index: number) => {
    const layers = rendererRef.current?.stage.getChildAt(0) as Container;
    const current = layers.getChildAt(index) as Graphics;

    current.tint = 0xffffff;
  };

  const saveCanvas = () => {
    const layers = rendererRef.current?.stage.getChildAt(0) as Container;

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
        selectLayer: setLayer,
        highlightLayer,
        unhighlightLayer,
        saveCanvas,
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

export function useLayers() {
  const context = useContext(DrawingContext);

  if (!context) throw new Error("Must useLayers inside of a DrawingProvider");

  const container = context.renderer?.current?.stage.getChildAt(0) as Container;

  const layers = container?.children ?? [];

  return {
    current: context.layer,
    layers,
    add: context.addLayer,
    select: context.selectLayer,
    hover: [context.highlightLayer, context.unhighlightLayer],
  };
}

export function useSaveLoad() {
  const context = useContext(DrawingContext);

  if (!context) throw new Error("Must useSaveLoad inside of a DrawingProvider");

  return {
    save: context.saveCanvas,
  };
}
