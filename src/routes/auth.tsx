import { redirect } from "remix";
import supabase from "~/services";

export let action = ({}) => {
  const url = supabase.auth.api.getUrlForProvider("discord", {
    redirectTo: "http://localhost:3000/auth/callback",
  });
  console.log(url);
  return redirect(url);
};
