import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";

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
    <>
      <Link to="/">{props.data.message}</Link>
    </>
  );
}

export default function Index() {
  const data = useLoaderData<IndexData>();

  return <View data={data} />;
}
