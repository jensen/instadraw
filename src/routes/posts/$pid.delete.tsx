import { ActionFunction } from "remix";
import { redirect } from "remix";
import { supabase } from "~/utils/auth";

export let action: ActionFunction = async ({ request, params }) => {
  const db = supabase();

  await db.from("posts").delete().match({ id: params.pid });

  return redirect("/");
};
