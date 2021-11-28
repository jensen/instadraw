import { useCanvas, useDrawing } from "./context";

export default function Canvas(props) {
  const canvas = useCanvas();
  const { startDrawing, stopDrawing } = useDrawing();

  return (
    <canvas ref={canvas} onMouseUp={stopDrawing} onMouseDown={startDrawing} />
  );
}
