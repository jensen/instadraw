import { Form, Link } from "remix";
import React from "react";
import { format } from "date-fns";

interface IPostProps {
  post: any;
  children: React.ReactNode;
  edit: boolean;
}

export default function Post(props: IPostProps) {
  return (
    <article className="bg-gray-50">
      <header className="h-16 border border-gray-300 rounded-t-sm flex justify-between items-center p-4">
        <div className="flex space-x-2">
          <div className="rounded-full h-12 w-12 border-2 bg-gray-200  flex justify-center items-center">
            <img className="rounded-full" src={props.post.user.avatar} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl text-gray-800 font-bold">
              {props.post.title}
            </h2>
            <h3 className="text-xs text-gray-400">
              Started by {props.post.user.name}
            </h3>
          </div>
        </div>
        {props.edit ? (
          <Link to={`/posts/${props.post.id}`}>Back</Link>
        ) : (
          <Link to={`/posts/${props.post.id}/edit`}>Edit</Link>
        )}
      </header>
      <main className="border-l border-r border-gray-300">
        {props.children}
      </main>
      <aside className="h-48 p-4 border-l border-r border-t border-gray-300">
        <h4 className="text-xs font-light text-gray-400 leading-tight uppercase">
          {format(new Date(props.post.created_at), "MMMM dd")}
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

Post.defaultProps = {
  edit: false,
};
