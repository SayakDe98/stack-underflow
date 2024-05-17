"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { publicPaths } from "@/app/utils/constants";
import { toast } from "react-toastify";

const Topbar = () => {
  const pathname = usePathname();
  const [topBarMenuOpen, setTopBarMenuOpen] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    setToken(document.cookie.split("token=")[1]);
  }, []);
  const isPublicPath = publicPaths.includes(pathname);
  const logoutHandler = () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/logout`, {
      method: "POST",
    }).then((dataPromise) => {
      dataPromise.json().then((data) => toast.success(data?.message));
      if (dataPromise.ok) {
        router.push("/login");
      }
    });
  };
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center gap-3 rtl: space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Stack Underflow
          </span>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setTopBarMenuOpen((pre) => !pre)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            topBarMenuOpen ? "absolute top-8 right-1 z-10" : "static hidden"
          } w-auto md:block`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className={`block py-2 px-3 rounded md:bg-transparent ${
                  pathname?.length === 1 ? "text-blue-700" : "text-gray-900"
                } md:p-0`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {isPublicPath && !token && (
              <li>
                <Link
                  href="/login"
                  className={`block py-2 px-3 ${
                    pathname.includes("/login")
                      ? "text-blue-700"
                      : "text-gray-900"
                  } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                >
                  Login
                </Link>
              </li>
            )}
            {isPublicPath && !token && (
              <li>
                <Link
                  href="/register"
                  className={`block py-2 px-3 ${
                    pathname.includes("/register")
                      ? "text-blue-700"
                      : "text-gray-900"
                  } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                >
                  Register
                </Link>
              </li>
            )}
            {(!isPublicPath || token) && (
              <li>
                <Link
                  href="/questions"
                  className={`block py-2 px-3 ${
                    pathname.includes("/questions")
                      ? "text-blue-700"
                      : "text-gray-900"
                  } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                >
                  Questions
                </Link>
              </li>
            )}
            {(!isPublicPath || token) && (
              <li>
                <Link
                  href="/topics"
                  className={`block py-2 px-3 ${
                    pathname.includes("/topics")
                      ? "text-blue-700"
                      : "text-gray-900"
                  } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                >
                  Topics
                </Link>
              </li>
            )}
            {(!isPublicPath || token) && (
              <li>
                <Link
                  href="/popular"
                  className={`block py-2 px-3 ${
                    pathname.includes("/popular")
                      ? "text-blue-700"
                      : "text-gray-900"
                  } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                >
                  Popular Topics
                </Link>
              </li>
            )}
            {(!isPublicPath || token) && (
              <li>
                <Link
                  href="/allTimeFavorites"
                  className={`block py-2 px-3 ${
                    pathname.includes("/allTimeFavorites")
                      ? "text-blue-700"
                      : "text-gray-900"
                  } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                >
                  All Time Favorites
                </Link>
              </li>
            )}
            {(!isPublicPath || token) && (
              <li>
                {" "}
                <button
                  className="block py-2 px-3 
                     text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
