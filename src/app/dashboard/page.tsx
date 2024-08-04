import Modal from "@/components/modal";
import Post from "@/components/post";
import prisma from "@/lib/db";
import Link from "next/link";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

const page = async ({ searchParams }: SearchParamProps) => {
  const show = searchParams?.show;
  const post = await prisma.post.findMany();
  return (
    <main className="p-4 max-w-[500px] md:max-w-[700px]  lg:max-w-[900px] m-auto">
      {post.map((post) => (
        <Link key={post.id} href={`/dashboard/post/${post.id}`}>
          <Post
            id={post.id}
            title={post.title}
            description={post.description}
          />
        </Link>
      ))}

      {show && <Modal />}
    </main>
  );
};
export default page;
