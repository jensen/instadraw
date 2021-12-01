import { Dialog, Transition } from "@headlessui/react";
import { Form, useNavigate } from "remix";
import { Fragment, useState } from "react";
import { Navigate } from "react-router";
import { PrimaryButton, SecondaryButton } from "~/components/common/Button";

export default function NewPost() {
  const navigate = useNavigate();

  const cancel = () => navigate("/");

  return (
    <Transition appear show as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={cancel}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 mb-2"
              >
                Create Post
              </Dialog.Title>

              <Form method="post" action="/posts">
                <input
                  name="title"
                  className="p-2 text-xl font-bold border-2 border-black rounded w-full"
                />
                <div className="mt-2">
                  <p className="text-xs text-gray-500">
                    What would you like to title your post?
                  </p>
                </div>
                <div className="mt-4 space-x-2">
                  <PrimaryButton type="submit">Post</PrimaryButton>
                  <SecondaryButton onClick={cancel}>Cancel</SecondaryButton>
                </div>
              </Form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
