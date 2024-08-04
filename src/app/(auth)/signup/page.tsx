import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { handleLogin, handleRegister } from "@/actions/action";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h1>
        <form action={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="identifier" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="identifier" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
          {/* <button
          disabled={pending}
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button> */}
          <Button className="w-full ">Sign Up</Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
