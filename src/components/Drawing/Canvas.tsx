import { useCanvas, useDrawing } from "./context";

export default function Canvas(props) {
  const canvas = useCanvas();
  const { startDrawing, stopDrawing } = useDrawing();

  return (
    <canvas
      ref={canvas}
      width="540px"
      height="675px"
      onMouseUp={stopDrawing}
      onMouseDown={startDrawing}
    />
  );
}
