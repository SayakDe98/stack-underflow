"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { userValidator } from "../utils/validators/user.validator";
import { commonConstants } from "../utils/constants";
import withPortalAppBar from "../components/common/portalLayout";
import { toast } from "react-toastify";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitted },
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(userValidator),
    shouldFocusError: false,
  });
  const {
    FIRST_NAME,
    FIRST_NAME_PLACEHOLDER,
    LAST_NAME,
    LAST_NAME_PLACEHOLDER,
    EMAIL,
    EMAIL_PLACEHOLDER,
    PASSWORD,
    PASSWORD_PLACEHOLDER,
    CONTACT_NUMBER,
    CONTACT_NUMBER_PLACEHOLDER,
    REGISTER,
  } = commonConstants;
  const onSubmit = () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/register`, {
      method: "POST",
      body: JSON.stringify(getValues()),
    }).then((dataPromise) => {
      if (dataPromise.ok) {
        reset();
      }
      dataPromise.json().then((data) => {
        toast.success(data.message);
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto border border-gray-300 p-10 m-auto"
    >
      <div className="my-1 flex flex-col">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark: text-gray-900">
          {FIRST_NAME}
        </label>
        <input
          {...register("firstName")}
          type="text"
          className={`shadow-sm bg-gray-50 border ${
            touchedFields?.firstName && errors["firstName"]?.message
              ? "border-red-500"
              : "border-gray- 300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white:focus:ring-blue-500 dark:focus:border-500 dark:shadow-sm-light`}
          placeholder={FIRST_NAME_PLACEHOLDER}
        />
        {(touchedFields?.firstName || isSubmitted) &&
          errors["firstName"]?.message && (
            <span className="text-xs text-red-500">
              {errors["firstName"].message.toString()}
            </span>
          )}
      </div>

      <div className="my-1 flex flex-col">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {LAST_NAME}
        </label>
        <input
          {...register("lastName")}
          type="text"
          className={`shadow-sm bg-gray-50 border ${
            touchedFields?.lastName && errors["lastName"]?.message
              ? "border-red-500"
              : "border-gray- 300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white:focus:ring-blue-500 dark:focus:border-500 dark:shadow-sm-light`}
          placeholder={LAST_NAME_PLACEHOLDER}
        />
        {(touchedFields?.lastName || isSubmitted) &&
          errors["lastName"]?.message && (
            <span className="text-xs text-red-500">
              {errors["lastName"].message.toString()}
            </span>
          )}
      </div>

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
        {(touchedFields?.email || isSubmitted) && errors["email"]?.message && (
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

      <div className="my-1 flex flex-col">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {CONTACT_NUMBER}
        </label>
        <input
          {...register("contactNumber")}
          type="text"
          className={`shadow-sm bg-gray-50 border ${
            touchedFields?.contactNumber && errors["contactNumber"]?.message
              ? "border-red-500"
              : "border-gray- 300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white:focus:ring-blue-500 dark:focus:border-500 dark:shadow-sm-light`}
          placeholder={CONTACT_NUMBER_PLACEHOLDER}
        />
        {(touchedFields?.contactNumber || isSubmitted) &&
          errors["contactNumber"]?.message && (
            <span className="text-xs text-red-500">
              {errors["contactNumber"].message.toString()}
            </span>
          )}
      </div>
      <button
        type="submit"
        className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {REGISTER}
      </button>
    </form>
  );
};

export default withPortalAppBar(LoginPage, {});
