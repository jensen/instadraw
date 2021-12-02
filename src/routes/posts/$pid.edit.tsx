import { useCallback, useEffect, useRef } from "react";
import { LoaderFunction, useBeforeUnload } from "remix";
import { useLoaderData, json, useFetcher, useNavigate } from "remix";
import { getSupabase } from "~/utils/auth";
import { useSupabase } from "~/context/supabase";

import Post from "~/components/Post";
import Drawing from "~/components/Drawing";
import useUnload from "~/hooks/useUnload";

type IPostLoaderData = {
  post: IPostResource;
};

export let loader: LoaderFunction = async ({ request, params }) => {
  const db = await getSupabase(request);

  const { data: post, error } = await db
    .from<IPostResource>("posts")
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
  post: IPostResource;
}

const View = (props: IPostEditView) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const saveRef = useRef<() => ArrayBuffer>(() => new ArrayBuffer(0));
  const { actions: supabase } = useSupabase();

  useBeforeUnload(
    useCallback<any>(
      (event) => {
        if (props.post.layers.length === 0) {
          event.preventDefault();

          const confirmation =
            "Are you sure you want to leave without adding a layer?";

          event.returnValue = confirmation;

          return confirmation;
        }
      },
      [props.post]
    )
  );

  useUnload(
    useCallback(() => {
      if (props.post.layers.length === 0) {
        fetch(`/posts/${props.post.id}/delete`, {
          method: "post",
        });
      }
    }, [props.post])
  );

  useEffect(() => {
    if (fetcher.state === "idle") {
      if (fetcher.type === "init") {
        fetcher.load(`/posts/${props.post.id}`);
      } else {
        if (fetcher.data === null) {
          navigate("/");
        }
      }
    }
  }, [props.post.id, fetcher.data, fetcher.state, fetcher.type]);

  const save = () => {
    if (saveRef.current) {
      supabase.addLayer({
        post_id: props.post.id,
        data: saveRef.current(),
      });
    }
  };

  return (
    <Post edit post={props.post} onSave={save}>
      <Drawing layers={props.post.layers} saveRef={saveRef} />
    </Post>
  );
};

export default function PostEditRoute() {
  let { post } = useLoaderData();

  return <View post={post} />;
}
