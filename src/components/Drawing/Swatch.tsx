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
      className={cx("w-6 h-6 border-black", {
        "border-2": active === true,
        "border-0": active === false,
      })}
      style={{ backgroundColor: `#${props.color}` }}
      onClick={select}
    />
  );
}

interface ISwatchProps {}

export default function Swatch(props: ISwatchProps) {
  return (
    <div className="flex flex-col border border-r-0">
      {flatui.map(({ id, value }) => (
        <Color key={id} color={value} />
      ))}
    </div>
  );
}
