import DiscordLoginButton from "./DiscordLoginButton";
import { Link, useMatches } from "remix";
import { useSupabaseAuth } from "~/context/supabase";

const showCreateButton = (matches) => {
  const last = matches[matches.length - 1];

  if (last.pathname === "/new") return false;
  if (last.pathname.endsWith("/edit")) return false;

  return true;
};

export default function Header() {
  const matches = useMatches();
  const auth = useSupabaseAuth();
  const user = auth?.user();

  return (
    <>
      <h3 className="text-4xl tracking-tight leading-tight brand bg-gradient-to-l from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
        <a href="/">Instadraw</a>
      </h3>
      <div className="flex place-items-center">
        <DiscordLoginButton />
        {showCreateButton(matches) && user && (
          <Link className="primary-button" to="/new">
            New Post
          </Link>
        )}
      </div>
    </>
  );
}
