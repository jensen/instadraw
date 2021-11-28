import { DrawingProvider } from "./context";

import Canvas from "./Canvas";
import Swatch from "./Swatch";
import Brush from "./Brush";
import Layers from "./Layers";

export default function Drawing() {
  return (
    <DrawingProvider>
      <div className="flex">
        <div>
          <Canvas />
        </div>
        <Layers />
      </div>
      <div className="border-t">
        <Swatch />
      </div>
      {/* <Brush /> */}
    </DrawingProvider>
  );
}
