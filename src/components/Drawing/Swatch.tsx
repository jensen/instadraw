import { useBrush, useColor } from "./context";

import colors from "./data/bobross.json";

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
    <div className="flex space-x-2 p-4">
      {colors.map(({ id, value }) => (
        <Color key={id} color={value} />
      ))}
    </div>
  );
}
