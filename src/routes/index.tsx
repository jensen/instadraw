import type { LoaderFunction } from "remix";
import { useLoaderData, useNavigate, json } from "remix";
import { getSupabase } from "~/utils/auth";

import Post from "~/components/Post";
import LayerStack from "~/components/LayerStack";

export let loader: LoaderFunction = async ({ request }) => {
  const db = await getSupabase(request);

  const { data, error } = await db
    .from<IPostResource>("posts")
    .select(
      "*, layers(*, user: user_id(*)), comments(*, user: user_id(*)), user:user_id(*)"
    )
    .order("created_at", { ascending: false });
  const posts = data ? [...data] : [];

  return json({
    posts: posts
      .filter((post) => post.layers.length > 0)
      .map((post) => ({
        ...post,
        layers: post.layers.map((layer) => ({
          ...layer,
          image: db.storage
            .from("layers")
            .getPublicUrl(layer.image.split("/")[1]).publicURL,
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
