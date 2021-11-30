import { supabase as sb } from "~/services";

const token = "";

export function supabase() {
  return sb(token);
}
