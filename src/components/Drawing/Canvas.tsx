import useCanvas from "./hooks/useCanvas";

export default function Canvas(props) {
  const canvas = useCanvas();

  return (
    <canvas ref={canvas} onMouseUp={() => null} onMouseDown={() => null} />
  );
}
