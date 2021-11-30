import type { ActionFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import { supabase } from "~/utils/auth";
import Post from "~/components/Post";
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

interface IPostView {
  post: IPost;
}

const View = (props: IPostView) => {
  console.log(props.post.layers);
  return (
    <>
      <Post>
        <div style={{ width: `${WIDTH}px`, height: `${HEIGHT}px` }}>
          {props.post.layers.map((layer) => (
            <img className="absolute" src={layer.image} />
          ))}
        </div>
      </Post>
    </>
  );
};

export default function PostRoute() {
  let { post } = useLoaderData();

  return <View post={post} />;
}
