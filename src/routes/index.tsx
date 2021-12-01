import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, Link, useNavigate } from "remix";
import { json } from "remix";
import { supabase } from "~/utils/auth";

import Post from "~/components/Post";
import LayerStack from "~/components/LayerStack";

export let loader: LoaderFunction = async ({ request }) => {
  const db = supabase();

  const { data, error } = await db
    .from("posts")
    .select(
      "*, layers(*, user: user_id(*)), comments(*, user: user_id(*)), user:user_id(*)"
    );
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
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {props.posts.map((post) => (
        <div key={post.id} onClick={() => navigate(`posts/${post.id}`)}>
          <Post post={post} minimal>
            <LayerStack layers={post.layers} />
          </Post>
        </div>
      ))}
    </div>
  );
}

export default function Index() {
  const { posts } = useLoaderData();

  return <View posts={posts} />;
}
