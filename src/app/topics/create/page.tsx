"use client";
import Card from "@/app/components/common/Card";
import withPortalAppBar from "@/app/components/common/portalLayout";
import { topicValidator } from "@/app/utils/validators/topic.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const CreateTopic = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields, isSubmitted },
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(topicValidator),
    shouldFocusError: false,
  });
  const [editorLoaded, setEditorLoaded] = useState(false);
  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const onSubmit = () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/topics`, {
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
    <div className="mx-auto p-10 m-auto">
      <p className="font-bold text-3xl mb-1">Create a Topic</p>
      <div className="block p-6 bg-blue-400 border border-gray-200 rounded lg-shadow mb-10 text-white">
        A topic is a keyword or label that categorizes your question with other,
        similar questions. Using the right topics makes it easier for others to
        find and answer your question.
      </div>
      <div className="mx-auto m-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card
            styles={{
              mb: 10,
            }}
          >
            <div className="my-1 flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark: text-gray-900">
                Name
              </label>
              <p>What is the name of your topic?</p>
              <input
                {...register("name")}
                type="text"
                className={`shadow-sm bg-gray-50 border ${
                  touchedFields?.name && errors["name"]?.message
                    ? "border-red-500"
                    : "border-gray- 300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white:focus:ring-blue-500 dark:focus:border-500 dark:shadow-sm-light`}
                placeholder="Add a topic name on which users can ask questions and give answers as feedback."
              />
              {(touchedFields?.name || isSubmitted) &&
                errors["name"]?.message && (
                  <span className="text-xs text-red-500">
                    {errors["name"].message.toString()}
                  </span>
                )}
            </div>
          </Card>
          <Card
            styles={{
              mb: 10,
            }}
          >
            <div className="my-1 flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark: text-gray-900">
                What is the description of your topic?
              </label>
              <p>
                Introduce the topic and expand on what you put in the title.
                Minimum 20 characters.
              </p>
              {editorLoaded && (
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      {...field}
                      onChange={(text) => {
                        field.onChange(text);
                      }}
                      theme="snow"
                    />
                  )}
                />
              )}
              {editorLoaded &&
                (touchedFields?.description || isSubmitted) &&
                errors["description"]?.message && (
                  <span className="text-xs text-red-500">
                    {errors["description"].message.toString()}
                  </span>
                )}
            </div>
          </Card>
          <button
            type="submit"
            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add your Topic
          </button>
        </form>
      </div>
    </div>
  );
};

export default withPortalAppBar(CreateTopic, {});
