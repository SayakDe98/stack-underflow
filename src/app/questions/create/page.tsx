"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { questionValidator } from "../../utils/validators/question.validator";
import withPortalAppBar from "../../components/common/portalLayout";
import Card from "@/app/components/common/Card";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { MultiSelect } from "react-multi-select-component";
import { useTopics } from "@/app/utils/hooks/useTopics";

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields, isSubmitted, isSubmitting },
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(questionValidator),
    shouldFocusError: false,
  });
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const { getTopics } = useTopics();
  const [topics, setTopics] = useState<Array<any>>([]);
  const handleGetTopics = () => {
    const res = getTopics({});
    res.then((a) =>
      a.json().then((d) =>
        setTopics(
          d?.data?.map((h: any) => {
            return {
              value: h._id,
              label: h.name,
            };
          })
        )
      )
    );
  };
  useEffect(() => {
    handleGetTopics();
  }, []);

  const onSubmit = () => {
    const data = getValues();
    const createQuestion = {
      ...data,
      topics: data?.topics?.map((topic: any) => topic?.value),
    };
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/questions`, {
      method: "POST",
      body: JSON.stringify(createQuestion),
    }).then((dataPromise) => {
      if (dataPromise.ok) {
        reset();
      }
      dataPromise.json().then((data) => {
        toast.success(data.message);
      });
    });
  };
  useEffect(() => {
    console.log(getValues());
  }, [isSubmitting]);
  return (
    <div className="mx-auto p-10 m-auto">
      <p className="font-bold text-3xl">Ask a public question</p>
      <div className="block p-6 bg-blue-400 border border-gray-200 rounded lg-shadow mb-10">
        <div className="text-white">
          <div className="mb-1">Writing a good question</div>

          <div className="mb-5">
            You’re ready to ask a programming-related question and this form
            will help guide you through the process. Looking to ask a
            non-programming question? See the topics here to find a relevant
            site.
          </div>

          <div className="mb-5">
            <h6 className="mb-1">Steps</h6>
            <ul>
              <li>- Summarize your problem in a one-line title.</li>
              <li>- Describe your problem in more detail.</li>
              <li>
                - Describe what you tried and what you expected to happen.
              </li>
              <li>
                - Add “tags” which help surface your question to members of the
                community.
              </li>
              <li>- Review your question and post it to the site.</li>
            </ul>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          styles={{
            mb: 10,
          }}
        >
          <div className="my-1 flex flex-col">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark: text-gray-900">
              Title
            </label>
            <p>
              Be specific and imagine you’re asking a question to another
              person.
            </p>
            <input
              {...register("title")}
              type="text"
              className={`shadow-sm bg-gray-50 border ${
                touchedFields?.title && errors["title"]?.message
                  ? "border-red-500"
                  : "border-gray- 300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white:focus:ring-blue-500 dark:focus:border-500 dark:shadow-sm-light`}
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            />
            {(touchedFields?.title || isSubmitted) &&
              errors["title"]?.message && (
                <span className="text-xs text-red-500">
                  {errors["title"].message.toString()}
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
              What are the details of your problem?
            </label>
            <p>
              Introduce the problem and expand on what you put in the title.
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
        <Card
          styles={{
            mb: 10,
          }}
        >
          <div className="my-1 flex flex-col">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark: text-gray-900">
              What did you try and what were you expecting?
            </label>
            <p>
              Describe what you tried, what you expected to happen, and what
              actually resulted. Minimum 20 characters.
            </p>
            {editorLoaded && (
              <Controller
                name="thingsDoneAndExpectations"
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
              (touchedFields?.thingsDoneAndExpectations || isSubmitted) &&
              errors["thingsDoneAndExpectations"]?.message && (
                <span className="text-xs text-red-500">
                  {errors["thingsDoneAndExpectations"].message.toString()}
                </span>
              )}
          </div>
        </Card>
        <Card>
          <>
            <div className="my-1 flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark: text-gray-900">
                Topics
              </label>
              <p>
                Add upto 5 topics to describe what your question is about. Start
                typing to see suggestions.
              </p>
              <Controller
                name="topics"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <MultiSelect
                    options={topics}
                    value={value ?? []}
                    onChange={onChange}
                    labelledBy="Select"
                  />
                )}
              />
              {editorLoaded &&
                (touchedFields?.topics || isSubmitted) &&
                errors["topics"]?.message && (
                  <span className="text-xs text-red-500">
                    {errors["topics"].message.toString()}
                  </span>
                )}
            </div>
            <button
              type="submit"
              className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Post your question
            </button>
          </>
        </Card>
      </form>
    </div>
  );
};

export default withPortalAppBar(CreatePost, {});
