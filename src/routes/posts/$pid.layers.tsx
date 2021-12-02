import type { ActionFunction } from "remix";
import { redirect } from "remix";
import { supabase } from "~/utils/auth";

interface ILayer {
  id: string;
  image: string;
  post_id: string;
}

export let action: ActionFunction = async ({ request, params }) => {
  const body = await request.formData();

  const post_id = params.pid;

  const layer: Partial<ILayer> = {
    image: body.get("image") as string,
    post_id,
  };

  await supabase().from<ILayer>("layers").insert(layer);

  return redirect(`/posts/${post_id}`);
};
