import cx from "classnames";
import { useLayers } from "./context";
import {
  LayerPlusIcon,
  LayerMinusIcon,
  EyeOpenIcon,
  EyeClosedIcon,
} from "./icons";

export default function Layers(props) {
  const {
    current,
    layers,
    add,
    select,
    hover: [hover, unhover],
  } = useLayers();

  return (
    <div className="w-full flex flex-col justify-between border-t border-b bg-gray-100">
      <ul className="w-full flex flex-col-reverse p-2">
        {layers.map((layer, index) => (
          <li
            className={cx(
              "flex justify-between border border-t-8 p-2 w-full mb-2 space-x-2",
              {
                "border-gray-800": current === index,
              }
            )}
            onMouseOver={() => hover(index)}
            onMouseOut={() => unhover(index)}
            onClick={() => select(index)}
          >
            {true ? <EyeOpenIcon size={16} /> : <EyeClosedIcon size={16} />}
            <LayerMinusIcon size={16} />
          </li>
        ))}
      </ul>
      <div className="flex p-2">
        <div
          className="w-full rounded-md border p-2 cursor-pointer bg-gray-800 hover:bg-gray-900 hover:shadow-md"
          onClick={add}
        >
          <LayerPlusIcon size={24} color="white" />
        </div>
      </div>
    </div>
  );
}
