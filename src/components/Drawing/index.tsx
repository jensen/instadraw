import React, { useState, useEffect, useRef } from "react";
import type { Application, Point, Container, Graphics } from "pixi.js";

import { interpolateDirect } from "~/utils/rendering";
import useMouseMove from "./hooks/useMouseMove";

import Canvas from "./Canvas";
import { DrawingProvider } from "./context";

const sizes = Array.from(new Array(10)).map((_, index) => index + 1);

export default function Drawing() {
  return (
    <DrawingProvider>
      <div className="flex">
        <Canvas />
        {/* <ul className="bg-gray-400">
          {layers.map((layer, i) => (
            <li
              className="w-24 h-24 bg-gray-300"
              onClick={() => setLayerIndex(i)}
            >
              {i}
            </li>
          ))}
        </ul> */}
      </div>

      <div style={{ display: "flex" }}>
        {colors.map((c, i) => (
          <div
            key={c.id}
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: `#${c.value}`,
              borderBottom: i === colorIndex ? "4px solid white" : "0",
            }}
            onClick={() => setColorIndex(i)}
          />
        ))}
      </div>

      {/* <button onClick={save}>Save</button>
      <button onClick={addLayer}>Add Layer</button>
      <button onClick={removeLayer}>RemoveLayer</button> */}
    </DrawingProvider>
  );
}
