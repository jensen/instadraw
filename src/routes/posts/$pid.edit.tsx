import type { LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import { supabase } from "~/utils/auth";
import Post from "~/components/Post";
import Drawing from "~/components/Drawing";

interface IPost {
  id: string;
  title: string;
}

type IPostLoaderData = {
  post: IPost;
};

export let loader: LoaderFunction = async ({ request, params }) => {
  const db = supabase();

  const { data: post, error } = await db
    .from("posts")
    .select(
      "*, layers(*, user:user_id(*)), comments(*, user: user_id(*)), user: user_id(*)"
    )
    .match({ id: params.pid })
    .maybeSingle();

  return json({
    post: {
      ...post,
      layers: post.layers.map((layer) => ({
        ...layer,
        image: db.storage.from("layers").getPublicUrl(layer.image.split("/")[1])
          .publicURL,
      })),
    },
  });
};

interface IPostEditView {
  post: IPost;
}

const View = (props: IPostEditView) => {
  return (
    <Post edit post={props.post}>
      <Drawing layers={props.post.layers} />
    </Post>
  );
};

export default function PostEditRoute() {
  let { post } = useLoaderData();

  return <View post={post} />;
}
