import { redirect } from "remix";
import supabase from "~/services";

export let loader = ({ request, params, context }) => {
  console.log(request);
  return redirect("/");
};
