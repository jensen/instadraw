import { isValidElement, useState } from "react";
import { useBrush } from "./context";

const sizes = [1, 2, 4, 6, 10, 12, 16];

interface ISizeProps {
  size: number;
}

function Size(props: ISizeProps) {
  const { active, select } = useBrush(props.size);

  const style = {
    width: `${props.size}px`,
    height: `${props.size}px`,
  };

  return (
    <div className="rounded-full bg-gray-900" style={style} onClick={select} />
  );
}

export default function Brush(props) {
  const [size, setSize] = useState(1);

  return (
    <div className="flex space-x-2">
      <Size size={size} />
      <input
        type="range"
        min="1"
        max="24"
        value={size}
        onChange={(event) => setSize(Number(event.target.value))}
      ></input>
    </div>
  );
}
