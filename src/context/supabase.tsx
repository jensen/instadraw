import { SupabaseClient } from "@supabase/supabase-js";
import React, { useContext, useEffect, useState } from "react";
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
  return useContext(SupabaseContext);
}
