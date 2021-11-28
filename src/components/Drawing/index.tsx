import { DrawingProvider } from "./context";

import Canvas from "./Canvas";
import Swatch from "./Swatch";
import Brush from "./Brush";
import Layers from "./Layers";

export default function Drawing() {
  return (
    <DrawingProvider>
      <div className="flex">
        <div className="bg-white">
          <Canvas />
        </div>
        <Layers />
      </div>
      <div className="border-0">
        <Swatch />
      </div>
      {/* <Brush /> */}
    </DrawingProvider>
  );
}
