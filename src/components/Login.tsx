"use client";

import appwriteService from "@/appwrite/config";
import useAuth from "@/context/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Destructure output of useAuth()
  const { setAuthStatus } = useAuth();

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const session = await appwriteService.login(formData);
      if (session) {
        setAuthStatus(true);
        router.push("/profile");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleChangeFormData = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: e.target.value,
    }));
  };
  return (
    <div className="flex items-center justify-center">
      <div className="w-full mx-auto max-w-lg bg-gray-200/50 rounded-xl p-10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[60px]">
            <img src="./favicon.ico" alt="Logo" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Login to your account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
        Don&apos;t have any account?&nbsp;
          <Link
            href={"/signup"}
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Signup
          </Link>
        </p>
        {error != "" && (
          <p className="font-medium text-primary transition-all duration-200 hover:underline mt-5">
            {error}
          </p>
        )}
        <form onSubmit={login} className="mt-8">
          <div className="space-y-5">
            
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-900"
              >
                Email: <span className="font-bold">{formData.email}</span>
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your email..."
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChangeFormData(e, "email")}
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="text-base font-medium text-gray-900"
              >
                Password:{" "}
                <span className="font-bold">
                  {"*".repeat(formData.password.length || 0)}
                </span>
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your password..."
                  id="password"
                  value={formData.password}
                  onChange={(e) => handleChangeFormData(e, "password")}
                  required
                />
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-primary/80"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
