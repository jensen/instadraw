import { useState } from "react";
import { useColor } from "./context";
import cx from "classnames";

import bobross from "./data/bobross.json";
import flatui from "./data/flatui.json";
import bob from "../../../public/bob.png";

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
  const [palette, setPalette] = useState(flatui);

  return (
    <div className="flex flex-col h-full justify-between bg-gray-300">
      <div>
        {palette.map(({ id, value }) => (
          <Color key={id} color={value} />
        ))}
      </div>
      <div>
        <button
          className={cx("hover:opacity-100", {
            "opacity-40": palette === flatui,
            "opacity-90": palette === bobross,
          })}
          onClick={() =>
            setPalette((prev) => (prev === bobross ? flatui : bobross))
          }
        >
          <img src={bob} />
        </button>
      </div>
    </div>
  );
}
