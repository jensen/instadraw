import { MetaFunction, LoaderFunction, useLoaderData } from "remix";
import { json } from "remix";
import { supabase } from "~/utils/auth";

import Post from "~/components/Post";
import LayerStack from "~/components/LayerStack";

export let meta: MetaFunction = () => {
  return {
    title: "Index",
    description: "Index Page",
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  const db = supabase();

  const { data, error } = await db
    .from("posts")
    .select("*, layers(*), user:user_id(*)");
  const posts = data ? [...data] : [];

  return json({
    posts: posts.map((post) => ({
      ...post,
      layers: post.layers.map((layer) => ({
        ...layer,
        image: db.storage.from("layers").getPublicUrl(layer.image.split("/")[1])
          .publicURL,
      })),
    })),
  });
};

interface IIndexViewProps {
  posts: any[];
}

export function View(props: IIndexViewProps) {
  return (
    <div className="flex flex-col items-center space-y-8">
      <form action="/auth" method="post">
        <button type="submit">Login</button>
      </form>
      <form action="/posts" method="post">
        <input name="title" />
        <button type="submit">Create</button>
      </form>
      {props.posts.map((post) => (
        <Post post={post}>
          <LayerStack layers={post.layers} />
        </Post>
      ))}
    </div>
  );
}

export default function Index() {
  const { posts } = useLoaderData();

  return <View posts={posts} />;
}
