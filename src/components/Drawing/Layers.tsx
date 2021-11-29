import cx from "classnames";
import { useSupabase } from "~/context/supabase";
import { useLayers, useSaveLoad } from "./context";
import {
  LayerPlusIcon,
  LayerMinusIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  SaveIcon,
} from "./icons";

export default function Layers(props) {
  const {
    current,
    layers,
    add,
    select,
    hover: [hover, unhover],
  } = useLayers();

  const { save } = useSaveLoad();

  const supabase = useSupabase();

  return (
    <div className="w-full flex flex-col justify-between border-l bg-gray-100">
      <ul className="w-full flex flex-col-reverse p-2">
        {layers.map((layer, index) => (
          <li
            key={layer.name}
            className={cx(
              "flex justify-between border border-l-8 p-2 w-full mb-2 space-x-2",
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
      <div className="w-24 flex p-2">
        <div className="w-full flex justify-between rounded-md border p-2 cursor-pointer bg-gray-800 hover:bg-gray-900 hover:shadow-md">
          <LayerPlusIcon size={24} color="white" onClick={add} />
          <SaveIcon
            size={24}
            color="white"
            onClick={() => supabase.addLayer({ data: save(), post_id: "test" })}
          />
        </div>
      </div>
    </div>
  );
}
