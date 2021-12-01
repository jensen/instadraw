import cx from "classnames";
import { useParams } from "remix";
import { useSupabase } from "~/context/supabase";
import { useLayers, useSaveLoad } from "./context";
import {
  LayerPlusIcon,
  LayerMinusIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  SaveIcon,
} from "./icons";

interface ILayersProps {}

export default function Layers(props: ILayersProps) {
  const { pid } = useParams();
  const { save } = useSaveLoad();

  const { busy, actions: supabase } = useSupabase();

  return (
    <div className="w-full flex flex-col justify-between border border-l-0 bg-gray-100">
      <div className="flex p-2">
        <div className="w-full inline-flex justify-between rounded-md border p-2 cursor-pointer bg-gray-800 hover:bg-gray-900 hover:shadow-md">
          {busy === false && (
            <SaveIcon
              size={24}
              color="white"
              onClick={() =>
                supabase.addLayer({
                  data: save(),
                  post_id: pid || "",
                })
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
