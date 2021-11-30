import Canvas from "./Canvas";
import Swatch from "./Swatch";
import Layers from "./Layers";

import { DrawingProvider } from "./context";
import { WIDTH, HEIGHT } from "~/components/Drawing/context";

export default function Drawing(props) {
  return (
    <DrawingProvider>
      <div className="flex">
        <div className="bg-white">
          <div
            className="relative"
            style={{ width: `${WIDTH}px`, height: `${HEIGHT}px` }}
          >
            <div className="w-full h-full absolute">
              {props.layers.map((layer) => (
                <img className="absolute" src={layer.image} />
              ))}
            </div>
            <div className="w-full h-full absolute">
              <Canvas />
            </div>
          </div>
        </div>
        <Layers />
      </div>
      <div className="border-t border-0">
        <Swatch />
      </div>
      {/* <Brush /> */}
    </DrawingProvider>
  );
}
