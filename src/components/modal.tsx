import Link from "next/link";
import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { createPost } from "@/actions/action";
import { X } from "lucide-react";
const Modal = () => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-[60%] shadow-lg rounded-md bg-white">
        <div className="text-center">
          <div className="flex justify-between">
            <h3 className="text-2xl font-bold text-gray-900">
              Create New Blog Post
            </h3>
            <Link
              href="/dashboard"
              className="px-2 py-2 bg-red-500 text-white text-base font-medium rounded-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <X />
            </Link>
          </div>
          {/* <div className="mt-2 px-7 py-3">
            <p className="text-lg text-gray-500">Modal Body</p>
          </div> */}
          <div className="flex justify-center mt-4">
            <form action={createPost}>
              <Textarea
                placeholder="title"
                className="mb-6 w-auto"
                name="title"
              />

              <Textarea
                placeholder="description"
                className="mb-6"
                name="description"
              />
              {/* <Link href="/dashboard">
                <Button>Create</Button>
              </Link> */}
              <Button>Create</Button>
            </form>
            {/* Navigates back to the base URL - closing the modal */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
