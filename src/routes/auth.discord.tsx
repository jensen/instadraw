import { redirect } from "remix";

export let action = ({}) => {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.PROVIDER_DISCORD_CLIENT_ID || "",
    scope: "email identify",
    redirect_uri: `${process.env.CLIENT_HOST}/auth/callback`,
  });

  return redirect(
    `https://discord.com/api/oauth2/authorize?${params.toString()}`
  );
};
