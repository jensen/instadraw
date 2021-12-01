import DiscordLoginButton from "./DiscordLoginButton";
import { useMatch } from "react-router-dom";
import { Link } from "remix";

export default function Header() {
  const matches = useMatch("/new");

  return (
    <>
      <h3 className="text-4xl tracking-tight leading-tight brand bg-gradient-to-l from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
        <Link to="/">Instadraw</Link>
      </h3>
      <div className="flex place-items-center">
        <DiscordLoginButton />
        {matches === null && (
          <Link className="primary-button" to="/new">
            New Post
          </Link>
        )}
      </div>
    </>
  );
}
