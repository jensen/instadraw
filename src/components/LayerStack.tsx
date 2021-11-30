import { WIDTH, HEIGHT } from "~/components/Drawing/context";

export default function LayerStack(props) {
  return (
    <div
      className="relative"
      style={{ width: `${WIDTH}px`, height: `${HEIGHT}px` }}
    >
      {props.layers.map((layer) => (
        <img className="absolute" src={layer.image} />
      ))}
    </div>
  );
}
