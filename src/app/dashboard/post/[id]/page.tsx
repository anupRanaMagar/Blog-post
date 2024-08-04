import prisma from "@/lib/db";
import React from "react";
const page = async ({ id }: { id: number }) => {
  const post = await prisma.post.findFirst({
    where: {
      id: id,
    },
  });
  console.log(post);
  return (
    <div className="min-h-screen  flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className=" p-6 ">
          <h2 className="text-2xl font-bold text-gray-800 text-center block">
            {post?.title}
          </h2>
          <p className="mt-4 text-gray-600">{post?.description}</p>
        </div>
      </main>
    </div>
  );
};
export default page;
