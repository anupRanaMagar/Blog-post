import { getUser, handleLogout } from "@/actions/action";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "./ui/button";

const NavBar = async () => {
  const user = await getUser();
  console.log(user, "navigation");
  return (
    <header className="max-w-[500px] md:max-w-[700px]  lg:max-w-[900px] m-auto flex justify-between my-8">
      <Link href={"/"} className="font-bold">
        MyBlog
      </Link>
      <nav className="flex gap-4">
        {!user ? (
          <>
            <Link href={"/login"}>Login</Link>
            <Link href={"/signup"}>Register</Link>
          </>
        ) : (
          <>
            <Link href="/dashboard/?show=true">create blog</Link>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
