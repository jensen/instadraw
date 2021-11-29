import { Form } from "remix";
import Drawing from "~/components/Drawing";

export default function Post(props) {
  return (
    <article className="bg-gray-50">
      <header className="h-16 border border-gray-300 rounded-t-sm flex items-center p-4">
        <div className="rounded-full h-12 w-12 border-2 bg-gray-200  flex justify-center items-center">
          <div className=" rounded-full h-10 w-10 border-2 bg-gray-500"></div>
        </div>
      </header>
      <main className="border-l border-r border-gray-300">
        <Drawing />
      </main>
      <aside className="h-48 p-4 border-l border-r border-t border-gray-300">
        <h4 className="text-xs font-light text-gray-400 leading-tight">
          NOVEMBER 12
        </h4>
      </aside>
      <footer className="p-4 border border-gray-300 rounded-b-sm">
        <Form method="post">
          <section className="flex">
            <input
              className="w-full bg-gray-50 text-md focus:outline-none"
              placeholder="Add a comment..."
            />
            <button>Post</button>
          </section>
        </Form>
      </footer>
    </article>
  );
}
