import { deletePost } from "@/actions/action";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

const Post = ({ title, description, id }: PostInterface) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-4 lg:max-w-3xl">
      <div className="">
        <div className="p-8">
          <div className="flex justify-between">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {title}
            </div>
            <Button className="">
              <Trash2 className="h-5 w-5 hover:h-6 hover:w-6 transition-transform" />
            </Button>
          </div>
          <p className="mt-2 text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
