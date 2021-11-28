import React, { useRef, useContext } from "react";

import colors from "./data/colors.json";

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
}

const DrawingContext = React.createContext<IDrawingContext>({});

export function DrawingProvider(props) {
  const canvasRef = useRef<HTMLCanvasElement>();

  const canvas = canvasRef ? { canvas: canvasRef } : {};

  return (
    <DrawingContext.Provider
      value={{
        ...canvas,
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
