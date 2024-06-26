"use client";
import React from "react";
import withPortalAppBar from "../components/common/portalLayout";
import { useForm } from "react-hook-form";
import { loginUserValidator } from "../utils/validators/user.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { commonConstants } from "../utils/constants";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    getValues,
    reset,
    formState: { errors, touchedFields, isSubmitted },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginUserValidator),
    shouldFocusError: false,
  });
  const { EMAIL, EMAIL_PLACEHOLDER, PASSWORD, PASSWORD_PLACEHOLDER, LOGIN } =
    commonConstants;

  const onSubmit = () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(getValues()),
    }).then((dataPromise) => {
      dataPromise.json().then((data) => toast.success(data.message));

      if (dataPromise.ok) {
        reset();
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    });
  };

  return (
    <>
      <form
        className="max-w-sm mx-auto border border-gray-300 p-10 m-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="my-1 flex flex-col">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            {EMAIL}
          </label>
          <input
            {...register("email")}
            type="email"
            className={`shadow-sm bg-gray-50 border ${
              touchedFields?.email && errors["email"]?.message
                ? "border-red-500"
                : "border-gray- 300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white:focus:ring-blue-500 dark:focus:border-500 dark:shadow-sm-light`}
            placeholder={EMAIL_PLACEHOLDER}
          />
          {(touchedFields?.email || isSubmitted) &&
            errors["email"]?.message && (
              <span className="text-xs text-red-500">
                {errors["email"].message.toString()}
              </span>
            )}
        </div>

        <div className="my-1 flex flex-col">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            {PASSWORD}
          </label>
          <input
            {...register("password")}
            type="password"
            className={`shadow-sm bg-gray-50 border ${
              touchedFields?.password && errors["password"]?.message
                ? "border-red-500"
                : "border-gray- 300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white:focus:ring-blue-500 dark:focus:border-500 dark:shadow-sm-light`}
            placeholder={PASSWORD_PLACEHOLDER}
          />
          {(touchedFields?.password || isSubmitted) &&
            errors["password"]?.message && (
              <span className="text-xs text-red-500">
                {errors["password"].message.toString()}
              </span>
            )}
        </div>

        <button
          type="submit"
          className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {LOGIN}
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default withPortalAppBar(LoginPage, {});
