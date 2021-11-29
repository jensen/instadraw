import { useEffect } from "react";

import { useSupabase } from "~/context/supabase";

import Canvas from "./Canvas";
import Swatch from "./Swatch";
import Layers from "./Layers";
import { DrawingProvider } from "./context";

export default function Drawing() {
  return (
    <DrawingProvider>
      <div className="flex">
        <div className="bg-white">
          <Canvas />
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
