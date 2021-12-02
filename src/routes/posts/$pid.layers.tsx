import type { ActionFunction } from "remix";
import { redirect } from "remix";
import { getSupabase } from "~/utils/auth";

export let action: ActionFunction = async ({ request, params }) => {
  const supabase = await getSupabase(request);
  const body = await request.formData();

  const post_id = params.pid;

  const layer: Partial<ILayerResource> = {
    image: body.get("image") as string,
    post_id,
  };

  await supabase.from<ILayerResource>("layers").insert(layer);

  return redirect(`/posts/${post_id}`);
};
