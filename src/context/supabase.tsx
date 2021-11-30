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

const SupabaseContext = React.createContext<ISupabaseContext | null>(null);

interface ISupabaseProviderProps {
  children: React.ReactNode;
}

export default function SupabaseProvider(props: ISupabaseProviderProps) {
  const [supabase, setSupabase] = useState<SupabaseClient>(null);
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

export function useSupabase() {
  const { supabase, busy, setBusy } = useContext(SupabaseContext);
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
          body.append("post_id", post_id);

          submit(body, { method: "post", action: `/posts/${post_id}/layers` });
        }

        setBusy(false);
      },
    }),
    [supabase, submit]
  );

  return {
    busy,
    actions,
  };
}
