"use client";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useQuestions } from "@/app/utils/hooks/useQuestions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { QuestionType } from "../../../../types/question";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { answerValidator } from "@/app/utils/validators/answer.validator";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import withPortalAppBar from "@/app/components/common/portalLayout";
import jwt from "jsonwebtoken";

type CommentToSubmit = {
  value: string;
  answer: any;
};

const Question = () => {
  const params = useParams();
  const questionId = params?.questionId;
  const { getQuestion } = useQuestions();
  const [question, setQuestion] = useState<QuestionType>();
  const [userId, setUserId] = useState<string>("");
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [questionEdited, setQuestionEdited] = useState(false);
  const [commentToSubmit, setCommentToSubmit] = useState<CommentToSubmit>({
    value: "",
    answer: undefined,
  });

  console.log(question, "question");
  const handleQuestion = () => {
    const res = getQuestion((questionId as string) || "");
    res.then((a) => a.json().then((d) => setQuestion(d.data)));
  };
  useEffect(() => {
    handleQuestion();
  }, [questionEdited]);
  const {
    handleSubmit,
    control,
    formState: { errors, touchedFields, isSubmitted },
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(answerValidator),
    shouldFocusError: false,
  });

  useEffect(() => {
    setEditorLoaded(true);
    const token = getCookie("token");
    const decoded = token && (jwt.decode(token?.toString()) as any);
    setUserId(decoded?._id);
  }, []);
  const onSubmit = () => {
    const updatedQuestion = {
      ...question,
      answers: [
        ...(question?.answers || []),
        { user: userId, message: getValues("answer") },
      ],
    };
    questionId &&
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/questions/${questionId}`, {
        method: "PUT",
        body: JSON.stringify(updatedQuestion),
      }).then((dataPromise) => {
        dataPromise
          .json()
          .then((data) => toast.success(data.message))
          .then(() => reset())
          .then(() => setQuestionEdited((pre) => !pre));
      });
  };

  const handleVote = (vote: string) => {
    if (vote === "up") {
      const updateQuestion = {
        ...question,
        downVotes: question?.downVotes?.filter((vote) => {
          return vote?.user._id !== userId;
        }),
        upVotes: [...(question?.upVotes || []), { user: userId }],
      };
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/questions/${questionId}`, {
        method: "PUT",
        body: JSON.stringify(updateQuestion),
      }).then((dataPromise) => {
        dataPromise
          .json()
          .then((data) => toast.success(data.message))
          .then(() => setQuestionEdited((pre) => !pre));
      });
    } else if (vote === "down") {
      const updateQuestion = {
        ...question,
        upVotes: question?.upVotes?.filter((vote) => {
          return vote?.user._id !== userId;
        }),
        downVotes: [...(question?.downVotes || []), { user: userId }],
      };
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/questions/${questionId}`, {
        method: "PUT",
        body: JSON.stringify(updateQuestion),
      }).then((dataPromise) => {
        dataPromise
          .json()
          .then((data) => toast.success(data.message))
          .then(() => setQuestionEdited((pre) => !pre));
      });
    }
  };

  const submitCommentHandler = () => {
    if (commentToSubmit.value && commentToSubmit.answer) {
      const { value: comment, answer } = commentToSubmit;

      // Find the index of the answer within the answers array
      const answerIndex = question?.answers?.findIndex(
        (ans) => ans._id.toString() === answer?._id
      );

      if (answerIndex !== -1 && question?.answers) {
        // Construct the new comment object
        const newComment = {
          message: comment,
          timestamp: new Date(),
          // Assuming you have a user object representing the user who posted the comment
          user: userId, // Replace currentUser with your actual user object
        };

        // Push the new comment into the comments array of the corresponding answer
        question?.answers[answerIndex as number]?.comments.push(newComment);

        // Update the question document in the database
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/questions/${questionId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(question),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Failed to update question");
            }
          })
          .then((data) => {
            toast.success(data.message);
            setQuestionEdited((prev) => !prev);
          })
          .catch((error) => {
            console.error(error);
            toast.error("Failed to update question");
          });
      } else {
        toast.error("Answer not found");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between p-2">
        <div className="text-3xl">{question?.title}</div>
        <Link href="/questions/create">
          <button className="border-solid border-2 p-2 bg-blue-700 text-white">
            Ask Question
          </button>
        </Link>
      </div>
      <hr />
      <div className="flex">
        <div className="flex flex-col justify-center items-center">
          <div
            className={`border border-solid rounded-full p-1 cursor-pointer ${
              question?.upVotes?.findIndex(
                (vote) => vote.user._id === userId
              ) !== -1
                ? "bg-blue-400"
                : "bg-white"
            }`}
            onClick={() =>
              question?.upVotes?.findIndex(
                (vote) => vote.user._id === userId
              ) === -1 && handleVote("up")
            }
          >
            &#9650;
          </div>
          <div>
            {(question?.upVotes?.length || 0) -
              (question?.downVotes?.length || 0)}
          </div>
          <div
            className={`border border-solid rounded-full p-1 cursor-pointer ${
              question?.downVotes?.findIndex(
                (vote) => vote.user._id === userId
              ) !== -1
                ? "bg-blue-400"
                : "bg-white"
            }`}
            onClick={() =>
              question?.downVotes?.findIndex(
                (vote) => vote.user._id === userId
              ) === -1 && handleVote("down")
            }
          >
            &#x25bc;
          </div>
        </div>
        <div className="flex flex-col">
          <div
            dangerouslySetInnerHTML={{
              __html: question?.description || "",
            }}
          />
          <hr />
          Things tried till now and my expectations:
          <div
            dangerouslySetInnerHTML={{
              __html: question?.thingsDoneAndExpectations || "",
            }}
          />
        </div>
      </div>

      <div>
        {question?.answers?.length} Answers
        {
          <div>
            {question?.answers?.map((answer) => {
              console.log(answer, "ans");
              return (
                <div className="flex flex-col">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: answer?.message || "",
                    }}
                  />
                  <hr />
                  Things tried till now and my expectations:
                  <div
                    dangerouslySetInnerHTML={{
                      __html: answer?.user.firstName || "",
                    }}
                  />
                  {answer?.comments?.map((comment: any) => (
                    <div>
                      <div>{comment?.message}</div>
                      <div>
                        {comment?.user?.firstName +
                          " " +
                          comment?.user?.lastName}
                      </div>
                      <div>{new Date(comment?.timestamp).toString()}</div>
                    </div>
                  ))}
                  <div>
                    Add Comment:
                    <input
                      value={commentToSubmit?.value}
                      onChange={(e) =>
                        setCommentToSubmit({
                          value: e.target.value,
                          answer,
                        })
                      }
                    />
                  </div>
                  <div>
                    <button
                      className="border-solid border-2 p-2 bg-blue-700 text-white"
                      onClick={submitCommentHandler}
                    >
                      Add comment
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        }
      </div>

      <div>
        <div className="text-2xl">Your Answer</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {editorLoaded && (
            <Controller
              name="answer"
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
            (touchedFields?.answer || isSubmitted) &&
            errors["answer"]?.message && (
              <span className="text-xs text-red-500">
                {errors["answer"].message.toString()}
              </span>
            )}
          <button
            className="border-solid border-2 p-2 bg-blue-700 text-white"
            type="submit"
          >
            Post Your Answer
          </button>
        </form>
      </div>
    </div>
  );
};

export default withPortalAppBar(Question, {});
