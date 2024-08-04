"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "kghkehklghveleh";

import prisma from "@/lib/db";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export async function signAccessToken(userId: {}) {
  return jwt.sign(userId, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

export async function signRefreshToken(userId: {}) {
  return jwt.sign(userId, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

export async function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

export async function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}

export const handleLogin = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const currentUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    console.log(currentUser);
    if (!currentUser) {
      return { status: 401, body: "Invalid email or password" };
    }

    // Compare provided password with the stored hashed password
    const passOk = await bcrypt.compare(password, currentUser.password);
    console.log(passOk);
    if (!passOk) {
      return { status: 401, body: "Invalid email or password" };
    }

    const accessToken = (await signAccessToken({
      email: currentUser.email,
      id: currentUser.id,
    })) as string;
    const refreshToken = (await signRefreshToken({
      email: currentUser.email,
      id: currentUser.id,
    })) as string;

    cookies().set("jwt", accessToken);
    cookies().set("token", refreshToken, {
      httpOnly: true,
    });
  } catch (error) {
    console.log(error, "hello world");
    return { status: 500, body: "Invalid email or password" };
  }
  redirect("/dashboard");
};

export const handleRegister = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return new Response("user already exist", { status: 400 });
  }

  await prisma.user.create({
    data: {
      name: username,
      email: email,
      password: hashedPassword,
    },
  });
};
export const getUser = () => {
  try {
    const token = cookies().get("jwt");

    const decoded = jwt.verify(token?.value, ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    return new Response("Unauthorized");
  }
};

export const createPost = async (formData: FormData) => {
  const user = getUser();
  const author = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });
  console.log(author);

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  await prisma.post.create({
    data: {
      title: title,
      description: description,
      author: {
        connect: { id: author?.id },
      },
    },
  });
  redirect("/dashboard");
};

export const handleLogout = () => {
  cookies().delete("jwt");
  cookies().delete("jwt");
  // redirect("/login");
};

export const deletePost = async (id: number) => {
  await prisma.post.delete({
    where: {
      id: id,
    },
  });
};
