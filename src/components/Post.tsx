import { Form, Link } from "remix";
import React from "react";
import { format } from "date-fns";
import { withStopPropagation } from "~/utils/events";
import { RealtimeClient } from "@supabase/realtime-js";

interface IPostProps {
  post: any;
  children: React.ReactNode;
  edit: boolean;
  minimal: boolean;
}

function Full(props) {
  const [layer] = props.layers;

  return (
    <div className="font-light">
      <h3 className="mb-2">
        Edited by <span className="font-semibold">{layer.user.name}</span> and{" "}
        <span className="font-semibold">others</span>
      </h3>
      <ul>
        {props.comments.map((comment) => (
          <li>
            <span className="font-semibold mr-1">{comment.user.name}</span>
            <span className="text-sm">{comment.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Preview(props) {
  const recent = props.comments.slice(0, 2);

  return (
    <div className="font-light">
      <h3 className="mb-2">
        Edited by <span className="font-semibold">jensen</span> and{" "}
        <span className="font-semibold">others</span>
      </h3>
      {recent.length < props.comments.length && (
        <span className="text-sm font-semibold text-gray-400 hover:underline cursor-pointer">
          View all {props.comments.length} comments
        </span>
      )}
      <ul>
        {recent.map((comment) => (
          <li>
            <span className="font-semibold mr-1">{comment.user.name}</span>
            <span className="text-sm">{comment.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Post(props: IPostProps) {
  return (
    <article className="bg-gray-50">
      <header className="border border-b-0 rounded-t-sm flex justify-between items-center p-4">
        <div className="flex space-x-2 items-center">
          <div className="rounded-full h-16 w-16 border-2 bg-gray-200  flex justify-center items-center">
            <img className="rounded-full" src={props.post.user.avatar} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg text-gray-700 font-bold leading-tight">
              {props.post.title}
            </h2>
            <h3 className="text-sm text-gray-400">
              Started by {props.post.user.name}
            </h3>
            <h5 className="text-xs text-gray-400">
              {format(new Date(props.post.created_at), "MMMM do")}
            </h5>
          </div>
        </div>
        <div onClick={withStopPropagation()}>
          {props.edit ? (
            <Link to={`/posts/${props.post.id}`}>Back</Link>
          ) : (
            <Link to={`/posts/${props.post.id}/edit`}>Edit</Link>
          )}
        </div>
      </header>
      <main className="p-2 border">
        <div className="bg-white">{props.children}</div>
      </main>
      {props.edit === false && (
        <>
          <aside className="border-l border-r hover:shadow-md hover:bg-gray-100">
            <Form
              method="post"
              action={`/posts/${props.post.id}/comments`}
              onClick={withStopPropagation()}
            >
              <section className="flex pr-4">
                <input
                  name="content"
                  className="w-full p-4 bg-transparent text-md focus:outline-none"
                  placeholder="Add a comment..."
                />
                <button type="submit">Post</button>
              </section>
            </Form>
          </aside>
          <footer className="p-4 border rounded-b-sm">
            {props.minimal ? (
              <Preview
                layers={props.post.layers}
                comments={props.post.comments}
              />
            ) : (
              <Full layers={props.post.layers} comments={props.post.comments} />
            )}
          </footer>
        </>
      )}
    </article>
  );
}

Post.defaultProps = {
  edit: false,
  minimal: false,
};
