import { Form, Link } from "remix";
import React from "react";
import { format } from "date-fns";
import { withStopPropagation } from "~/utils/events";
import { DangerButton, SuccessButton } from "~/components/common/Button";
import { SupabaseUser, useSupabaseAuth } from "~/context/supabase";

interface IEditedByProps {
  user: any;
}

function EditedBy(props: IEditedByProps) {
  return (
    <h3 className="mb-2">
      Edited by <span className="font-semibold">{props.user.name}</span> and{" "}
      <span className="font-semibold">others</span>
    </h3>
  );
}

interface ICommentListProps {
  comments: ICommentResource[];
}

function CommentList(props: ICommentListProps) {
  return (
    <ul>
      {props.comments.map((comment) => (
        <li key={comment.id}>
          <span className="font-semibold mr-1">{comment.user.name}</span>
          <span className="text-sm">{comment.content}</span>
        </li>
      ))}
    </ul>
  );
}

interface ICommentCountProps {
  show: boolean;
  count: number;
}

function CommentCount(props: ICommentCountProps) {
  if (props.show) {
    return (
      <span className="text-sm font-semibold text-gray-400 hover:underline cursor-pointer">
        View all {props.count} comments
      </span>
    );
  }

  return null;
}

interface IFullProps {
  comments: ICommentResource[];
  layers: ILayerResource[];
}

function Full(props: IFullProps) {
  const [layer] = props.layers;

  if (layer === undefined) return null;

  return (
    <>
      <EditedBy user={layer.user} />
      <CommentList comments={props.comments} />
    </>
  );
}

interface IPreviewProps {
  comments: ICommentResource[];
  layers: ILayerResource[];
}

function Preview(props: IPreviewProps) {
  const recent = props.comments.slice(0, 2);
  const [layer] = props.layers;

  if (layer === undefined) return null;

  return (
    <>
      <EditedBy user={layer.user} />
      <CommentCount
        show={recent.length < props.comments.length}
        count={props.comments.length}
      />
      <CommentList comments={recent} />
    </>
  );
}

interface IPostProps {
  post: any;
  children: React.ReactNode;
  edit: boolean;
  minimal: boolean;
  onSave?: (data) => void;
}

export default function Post(props: IPostProps) {
  const auth = useSupabaseAuth();

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
        <SupabaseUser>
          <div onClick={withStopPropagation()}>
            {props.edit ? (
              <div className="space-x-2">
                <SuccessButton onClick={props.onSave}>Save</SuccessButton>
                {props.post.layers.length > 0 ? (
                  <Link
                    className="danger-button"
                    to={`/posts/${props.post.id}`}
                  >
                    Cancel
                  </Link>
                ) : (
                  <Form
                    className="inline"
                    action={`/posts/${props.post.id}/delete`}
                    method="post"
                  >
                    <DangerButton type="submit">Cancel</DangerButton>
                  </Form>
                )}
              </div>
            ) : (
              <Link
                className="primary-button"
                to={`/posts/${props.post.id}/edit`}
              >
                Draw
              </Link>
            )}
          </div>
        </SupabaseUser>
      </header>
      <main className="p-2 border">
        <div className="bg-white">{props.children}</div>
      </main>
      {props.edit === false && (
        <>
          <aside className="border-l border-r hover:shadow-md hover:bg-gray-100">
            <SupabaseUser
              fallback={
                <p className="px-4 py-2 text-sm text-gray-400">
                  <button
                    className="text-indigo-800 font-bold hover:text-indigo-900"
                    onClick={() =>
                      auth?.signIn({
                        provider: "discord",
                      })
                    }
                  >
                    Login
                  </button>{" "}
                  to post a comment
                </p>
              }
            >
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
                  <button className="text-indigo-800" type="submit">
                    Post
                  </button>
                </section>
              </Form>
            </SupabaseUser>
          </aside>
          <footer className="p-4 border rounded-b-sm">
            <div className="font-light">
              {props.minimal ? (
                <Preview
                  layers={props.post.layers}
                  comments={props.post.comments}
                />
              ) : (
                <Full
                  layers={props.post.layers}
                  comments={props.post.comments}
                />
              )}
            </div>
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
