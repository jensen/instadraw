import React, { useState, useEffect, useRef } from "react";
import type { Application, Point, Container, Graphics } from "pixi.js";

import { interpolateDirect } from "~/utils/rendering";
import useMouseMove from "./hooks/useMouseMove";

import { DrawingProvider } from "./context";

import Canvas from "./Canvas";
import Swatch from "./Swatch";
import Brush from "./Brush";

export default function Drawing() {
  return (
    <DrawingProvider>
      <div className="flex">
        <Canvas />
      </div>
      <Swatch />
      <Brush />
      {/* <button onClick={save}>Save</button>
      <button onClick={addLayer}>Add Layer</button>
      <button onClick={removeLayer}>RemoveLayer</button> */}
    </DrawingProvider>
  );
}
