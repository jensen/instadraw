import type { LoaderFunction } from "remix";
import { useLoaderData, json } from "remix";
import { supabase } from "~/utils/auth";
import Post from "~/components/Post";
import LayerStack from "~/components/LayerStack";

interface IPost {
  id: string;
  title: string;
  layers: any[];
}

type IPostLoaderData = {
  post: IPost;
};

export let loader: LoaderFunction = async ({ request, params }) => {
  const db = supabase();

  const { data: post, error } = await db
    .from("posts")
    .select("*, layers(*), user: user_id(*)")
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

interface IPostView {
  post: IPost;
}

const View = (props: IPostView) => {
  return (
    <>
      <Post post={props.post}>
        <LayerStack layers={props.post.layers} />
      </Post>
    </>
  );
};

export default function PostRoute() {
  let { post } = useLoaderData();

  return <View post={post} />;
}
