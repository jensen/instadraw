import type { MetaFunction } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Index",
    description: "Index Page",
  };
};

interface IIndexViewProps {}

export function View(props: IIndexViewProps) {
  return (
    <div className="flex flex-col items-center space-y-8">
      <form action="/auth" method="post">
        <button type="submit">Login</button>
      </form>
      <form action="/posts" method="post">
        <input name="title" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default function Index() {
  return <View />;
}
