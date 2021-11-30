import type { ActionFunction } from "remix";
import { redirect } from "remix";
import { supabase } from "~/utils/auth";

interface IPost {
  id: string;
  title: string;
}

export let action: ActionFunction = async ({ request }) => {
  const db = supabase();
  const body = await request.formData();

  const post: Partial<IPost> = {
    title: body.get("title") as string,
  };

  const { data } = await db.from("posts").insert(post).single();

  if (data) {
    return redirect(`/posts/${data.id}`);
  }
};
