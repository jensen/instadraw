import type { LoaderFunction } from "remix";
import { useLoaderData, json } from "remix";
import { getSupabase } from "~/utils/auth";
import Post from "~/components/Post";
import LayerStack from "~/components/LayerStack";

type IPostLoaderData = {
  post: IPostResource;
};

export let loader: LoaderFunction = async ({ request, params }) => {
  const db = await getSupabase(request);

  const { data: post, error } = await db
    .from<IPostResource>("posts")
    .select(
      "*, layers(*, user: user_id(*)), comments(*, user: user_id(*)), user: user_id(*)"
    )
    .match({ id: params.pid })
    .maybeSingle();

  if (!post) {
    return json(null, 404);
  }

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
  post: IPostResource;
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
