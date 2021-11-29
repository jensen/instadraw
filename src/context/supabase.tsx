import { SupabaseClient } from "@supabase/supabase-js";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { supabase as supabaseClient } from "~/services";

const SupabaseContext = React.createContext<SupabaseClient | null>(null);

interface ISupabaseProviderProps {
  children: React.ReactNode;
}

export default function SupabaseProvider(props: ISupabaseProviderProps) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    setSupabase(supabaseClient());
  }, []);

  return (
    <SupabaseContext.Provider value={supabase}>
      {supabase && props.children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const supabase = useContext(SupabaseContext);

  return useMemo(
    () => ({
      addLayer: async ({
        data,
        post_id,
      }: {
        data: ArrayBuffer;
        post_id: string;
      }) => {
        const tmp = `image-${new Date().getTime()}.png`;

        await supabase?.storage.from("layers").upload(tmp, data, {
          contentType: "image/png",
        });

        const { publicURL } = await supabase?.storage
          .from("layers")
          .getPublicUrl(tmp);

        const { data: layer } = await supabase?.from("layers").insert({
          image: publicURL,
          post_id,
        });

        await supabase?.storage
          .from("avatars")
          .move(tmp, `image-${data.id}.png`);
      },
    }),
    [supabase]
  );
}
