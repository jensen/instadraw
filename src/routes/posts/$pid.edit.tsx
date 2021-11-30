import type { ActionFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import { supabase } from "~/utils/auth";
import Post from "~/components/Post";
import Drawing from "~/components/Drawing";
import { WIDTH, HEIGHT } from "~/components/Drawing/context";

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
    .select("*, layers(*)")
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
    <div>
      <Post edit>
        <Drawing layers={props.post.layers} />
      </Post>
    </div>
  );
};

export default function PostEditRoute() {
  let { post } = useLoaderData();

  return <View post={post} />;
}
