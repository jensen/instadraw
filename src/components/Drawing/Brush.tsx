import { useBrush, useColor } from "./context";
import cx from "classnames";

const sizes = [2, 4, 6, 10, 12, 16];

interface ISizeProps {
  size: number;
}

function Size(props: ISizeProps) {
  const { current: color } = useColor();
  const { active, select } = useBrush(props.size);

  const style = {
    width: `${props.size * 2}px`,
    height: `${props.size * 2}px`,
    backgroundColor: active ? `#${color}` : `#cccccc`,
  };

  return <div className={cx("rounded-full")} style={style} onClick={select} />;
}

interface IBrushProps {}

export default function Brush(props: IBrushProps) {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 px-2 py-4">
      {sizes.map((size) => (
        <Size key={size} size={size} />
      ))}
    </div>
  );
}
