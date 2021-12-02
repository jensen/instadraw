import DiscordLoginButton from "./DiscordLoginButton";
import { Link, useMatches } from "remix";
import { SupabaseUser } from "~/context/supabase";

const showCreateButton = (matches) => {
  const last = matches[matches.length - 1];

  if (last.pathname === "/new") return false;
  if (last.pathname.endsWith("/edit")) return false;

  return true;
};

export default function Header() {
  const matches = useMatches();

  return (
    <>
      <h3 className="text-4xl tracking-tight leading-tight brand bg-gradient-to-l from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
        <a href="/">Instadraw</a>
      </h3>
      <div className="flex place-items-center">
        <DiscordLoginButton />
        <SupabaseUser>
          {showCreateButton(matches) && (
            <Link className="primary-button" to="/new">
              New Post
            </Link>
          )}
        </SupabaseUser>
      </div>
    </>
  );
}
