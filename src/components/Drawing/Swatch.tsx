import { useBrush, useColor } from "./context";

import bobross from "./data/bobross.json";
import flatui from "./data/flatui.json";

interface ISizeProps {
  color: string;
}

function Color(props: ISizeProps) {
  const { active, select } = useColor(props.color);

  return (
    <div
      className="rounded-full w-6 h-6"
      style={{ backgroundColor: `#${props.color}` }}
      onClick={select}
    >
      &nbsp;
    </div>
  );
}

export default function Swatch(props) {
  return (
    <div>
      <div className="flex space-x-2 px-4 py-2">
        {bobross.map(({ id, value }) => (
          <Color key={id} color={value} />
        ))}
      </div>
    </div>
  );
}
