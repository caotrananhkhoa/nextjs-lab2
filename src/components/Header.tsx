"use client";
import useAuth from "@/context/useAuth";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";

const menuItems = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "About",
        href: "#",
    },
    {
        name: "Contact",
        href: "#",
    },
];

export default function Header() {
    const { authStatus } = useAuth();
    return (
        <div className="relative w-full bg-white py-2">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                
                {/* Logo */}
                <div className="inline-flex items-center space-x-2">
                    <Link href={"/"} className="inline-block w-full max-w-[150px]">
                        <Logo />
                    </Link>
                </div>
                <div className="grow items-start lg:flex">
                    <ul className="ml-12 inline-flex space-x-8">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="inline-flex items-center text-sm font-semibold text-gray-800 hover:underline"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space-x-2 lg:block">
                    <Link
                        href={authStatus ? "/profile" : "/signup"}
                        className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-primary hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                        {authStatus ? "Profile" : "Sign up"}
                    </Link>
                    <Link
                        href={authStatus ? "/logout" : "/login"}
                        className="rounded-md border border-primary px-3 py-2 text-sm font-semibold text-primary shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary hover:bg-black hover:text-white hover:border-white"
                    >
                        {authStatus ? "Logout" : "Log In"}
                    </Link>
                </div>
            </div>
        </div>
    );
}