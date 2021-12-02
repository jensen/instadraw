import { redirect } from "remix";
import { supabase as sb } from "~/services";
import create from "~/services/cookie.server";

async function getToken(cookie: string) {
  const { getSession } = create();

  const session = await getSession(cookie);
  return session.get("token");
}

export async function isAuthenticated(cookie: string) {
  return (await getToken(cookie)) !== undefined;
}

export async function getUser(cookie: string) {
  const token = await getToken(cookie);
  const { user, error } = await sb(token).auth.api.getUser(token);

  if (error) {
    throw redirect("/");
  }

  return user;
}

export async function getSupabase(request: Request) {
  const cookie = request.headers.get("Cookie");

  return cookie ? sb(await getToken(cookie)) : sb();
}
