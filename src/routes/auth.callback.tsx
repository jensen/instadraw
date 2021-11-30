import { redirect } from "remix";

export let loader = ({ request, params, context }) => {
  return redirect("/");
};
