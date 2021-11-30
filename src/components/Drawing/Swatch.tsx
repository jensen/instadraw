import { useColor } from "./context";
import cx from "classnames";

import bobross from "./data/bobross.json";
import flatui from "./data/flatui.json";

interface ISizeProps {
  color: string;
}

function Color(props: ISizeProps) {
  const { active, select } = useColor(props.color);

  return (
    <div
      style={{
        borderColor: `rgba(0, 0, 0, 0.5)`,
        backgroundColor: `#${props.color}`,
      }}
      className={cx("w-6 h-6", {
        "border-l-4": active === true,
        "border-0": active === false,
      })}
      onClick={select}
    />
  );
}

interface ISwatchProps {}

export default function Swatch(props: ISwatchProps) {
  return (
    <div className="flex flex-col border border-r-0 bg-gray-300">
      {flatui.map(({ id, value }) => (
        <Color key={id} color={value} />
      ))}
    </div>
  );
}
