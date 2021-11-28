import { useLayers } from "./context";
import {
  LayerPlusIcon,
  LayerMinusIcon,
  EyeOpenIcon,
  EyeClosedIcon,
} from "./icons";

export default function Layers(props) {
  const { layers, add } = useLayers();

  return (
    <div className="w-full flex flex-col justify-between">
      <ul className="w-full p-2">
        {layers.map((layer) => (
          <li className="flex justify-between border p-2 w-full">
            {true ? <EyeOpenIcon size={16} /> : <EyeClosedIcon size={16} />}
            <LayerMinusIcon size={16} />
          </li>
        ))}
      </ul>
      <div className="flex w-32 p-2">
        <div className="border p-2" onClick={add}>
          <LayerPlusIcon size={24} />
        </div>
      </div>
    </div>
  );
}
