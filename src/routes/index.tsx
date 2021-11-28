import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";

import Drawing from "~/components/Drawing";

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
    <div className="h-full flex flex-col justify-center items-center">
      <Drawing />
    </div>
  );
}

export default function Index() {
  const data = useLoaderData<IndexData>();

  return <View data={data} />;
}
