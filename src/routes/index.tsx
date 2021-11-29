import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";

import Post from "~/components/Post";

type IndexData = {
  message: string;
};

export let loader: LoaderFunction = ({ request }) => {
  let data: IndexData = {
    message: "Basic Loader",
  };

  return json(data);
};

export let meta: MetaFunction = () => {
  return {
    title: "Index",
    description: "Index Page",
  };
};

interface IViewProps {
  data: any;
}

export function View(props: IViewProps) {
  return (
    <div className="flex flex-col items-center space-y-8">
      <Post />
      <form action="/auth" method="post">
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default function Index() {
  const data = useLoaderData<IndexData>();

  return <View data={data} />;
}
