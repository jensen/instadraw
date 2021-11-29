/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

type EnvironemntVars = "SUPABASE_URL" | "SUPABASE_ANON_KEY" | "CLIENT_HOST";
type WindowWithEnvironment = Window &
  typeof globalThis & {
    env: Record<EnvironemntVars, "string">;
  };

interface IEnvironment extends Record<EnvironemntVars, string> {}
