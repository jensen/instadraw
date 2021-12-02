import type { ActionFunction } from "remix";
import { redirect } from "remix";
import { getSupabase } from "~/utils/auth";

export let action: ActionFunction = async ({ request, params }) => {
  const supabase = await getSupabase(request);
  const body = await request.formData();

  const comment: Partial<ICommentResource> = {
    content: body.get("content") as string,
    post_id: params.pid,
  };

  await supabase.from<ICommentResource>("comments").insert(comment);

  return redirect(`/posts/${params.pid}`);
};
