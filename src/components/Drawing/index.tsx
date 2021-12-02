import Canvas from "./Canvas";
import Swatch from "./Swatch";
import Brush from "./Brush";
import Undo from "./Undo";

import { DrawingProvider } from "./context";

interface IDrawingProps {
  layers: { image: string }[];
  saveRef: React.MutableRefObject<() => void>;
}

export default function Drawing(props: IDrawingProps) {
  return (
    <DrawingProvider backgrounds={props.layers} saveRef={props.saveRef}>
      <div className="flex">
        <div className="border bg-gray-100">
          <Swatch />
        </div>
        <div className="bg-white">
          <Canvas />
        </div>
        <div className="border bg-gray-100 ">
          <div className="h-full flex flex-col justify-between">
            <Brush />
            <Undo />
          </div>
        </div>
      </div>
    </DrawingProvider>
  );
}
