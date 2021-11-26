import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json } from "remix";

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

export default function Index() {
  let data = useLoaderData<IndexData>();

  return <div>{data.message}</div>;
}
