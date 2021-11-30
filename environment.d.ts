declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_URL: string;
      SUPABASE_ANON_KEY: string;
      CLIENT_HOST: string;
      COOKIE_SESSION_KEY_A: string;
      COOKIE_SESSION_KEY_B: string;
      PROVIDER_DISCORD_CLIENT_ID: string;
      PROVIDER_DISCORD_SECRET: string;
    }
  }
}

export {};
