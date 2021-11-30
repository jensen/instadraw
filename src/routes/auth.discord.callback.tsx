import { redirect } from "remix";

export let loader = async ({ request }) => {
  const code = new URL(request.url).searchParams.get("code");

  if (code) {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.PROVIDER_DISCORD_CLIENT_ID || "",
      client_secret: process.env.PROVIDER_DISCORD_SECRET || "",
      redirect_uri: `${process.env.CLIENT_HOST}/auth/callback`,
      code: new URL(request.url).searchParams.get("code") || "",
    });

    const response = await fetch(`https://discord.com/api/oauth2/token`, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
  }

  return redirect("/");
};
