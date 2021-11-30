/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

type EnvironemntVars =
  | "SUPABASE_URL"
  | "SUPABASE_ANON_KEY"
  | "CLIENT_HOST"
  | "COOKIE_SESSION_KEY_A"
  | "COOKIE_SESSION_KEY_B"
  | "PROVIDER_DISCORD_CLIENT_ID"
  | "PROVIDER_DISCORD_SECRET";

type WindowWithEnvironment = Window &
  typeof globalThis & {
    env: Record<EnvironemntVars, "string">;
  };

interface IEnvironment extends Record<EnvironemntVars, string> {}
