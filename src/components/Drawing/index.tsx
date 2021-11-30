import Canvas from "./Canvas";
import Swatch from "./Swatch";
import Layers from "./Layers";

import { DrawingProvider } from "./context";
import { WIDTH, HEIGHT } from "~/components/Drawing/context";

interface IDrawingProps {
  layers: { image: string }[];
}

export default function Drawing(props: IDrawingProps) {
  return (
    <DrawingProvider backgrounds={props.layers}>
      <div className="flex">
        <Swatch />
        <div className="bg-white">
          <Canvas />
        </div>
        <Layers />
      </div>
      {/* <Brush /> */}
    </DrawingProvider>
  );
}
