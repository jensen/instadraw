import type { SupabaseClient } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";
import { useSubmit } from "remix";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { supabase as supabaseClient } from "~/services";

interface ISupabaseContext {
  supabase: SupabaseClient | null;
  busy: boolean;
  setBusy: React.Dispatch<React.SetStateAction<boolean>>;
}

const SupabaseContext = React.createContext<ISupabaseContext>({
  supabase: null,
  busy: false,
  setBusy: () => null,
});

interface ISupabaseProviderProps {
  children: React.ReactNode;
}

export default function SupabaseProvider(props: ISupabaseProviderProps) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setSupabase(supabaseClient());
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabase, busy, setBusy }}>
      {supabase && props.children}
    </SupabaseContext.Provider>
  );
}

function useSupabaseContext() {
  const context = useContext(SupabaseContext);

  if (!context) {
    throw new Error("Must useSupabase within a SupabaseProvider");
  }

  return context;
}

export function useSupabase() {
  const { supabase, busy, setBusy } = useSupabaseContext();
  const submit = useSubmit();

  const actions = useMemo(
    () => ({
      addLayer: async ({
        data,
        post_id,
      }: {
        data: ArrayBuffer;
        post_id: string;
      }) => {
        setBusy(true);

        const name = `${uuid()}.png`;
        const uploadResponse = await supabase?.storage
          .from("layers")
          .upload(name, data, {
            contentType: "image/png",
          });

        if (uploadResponse?.data) {
          const body = new FormData();

          body.append("image", uploadResponse.data.Key);

          submit(body, { method: "post", action: `/posts/${post_id}/layers` });
        }

        setBusy(false);
      },
    }),
    [supabase, submit]
  );

  return {
    supabase,
    busy,
    actions,
  };
}

export function useSupabaseAuth() {
  const { supabase } = useSupabaseContext();

  return supabase?.auth;
}

export function useSupabaseAuthListener() {
  const { supabase } = useSupabaseContext();
  const submit = useSubmit();

  useEffect(() => {
    const { data: authListener } = supabase?.auth.onAuthStateChange(
      (event, session) => {
        const body = { event, token: session?.access_token ?? "" };

        submit(body, { method: "post" });
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);
}

interface ISupabaseUserProps {
  fallback?: React.ReactChild;
  children: React.ReactNode;
}

export function SupabaseUser(
  props: React.PropsWithChildren<ISupabaseUserProps>
) {
  const auth = useSupabaseAuth();
  const user = auth?.user();

  if (user) return props.children || null;

  return props.fallback || null;
}
