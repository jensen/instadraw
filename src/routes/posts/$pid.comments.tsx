import type { ActionFunction } from "remix";
import { redirect } from "remix";
import { supabase } from "~/utils/auth";

interface IComment {
  id: string;
  content: string;
  post_id: string;
}

export let action: ActionFunction = async ({ request, params }) => {
  const body = await request.formData();

  const comment: Partial<IComment> = {
    content: body.get("content") as string,
    post_id: params.pid,
  };

  await supabase().from<IComment>("comments").insert(comment);

  return redirect(`/posts/${params.pid}`);
};
