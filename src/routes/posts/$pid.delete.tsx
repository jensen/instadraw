import { ActionFunction } from "remix";
import { redirect } from "remix";
import { getSupabase } from "~/utils/auth";

export let action: ActionFunction = async ({ request, params }) => {
  const db = await getSupabase(request);

  await db.from<IPostResource>("posts").delete().match({ id: params.pid });

  return redirect("/");
};
