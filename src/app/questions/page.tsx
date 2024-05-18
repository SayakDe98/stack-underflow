"use client";
import React, { useEffect, useState } from "react";
import withPortalAppBar from "../components/common/portalLayout";
import Card from "../components/common/Card";
import Link from "next/link";
import { useQuestions } from "../utils/hooks/useQuestions";
import QuestionCard from "./QuestionCard";
import { QuestionType } from "../../../types/question";

const Question = () => {
  const { getQuestions } = useQuestions();
  const [questions, setQuestions] = useState<Array<any>>([]);
  const handleQuestions = () => {
    const res = getQuestions({});
    res.then((a) => a.json().then((d) => setQuestions(d.data)));
  };
  useEffect(() => {
    handleQuestions();
  }, []);

  return (
    <Card>
      <div className="flex flex-col">
        <p className="font-bold c mb-2">Questions</p>
        <div className="flex">
          <Link href="/questions/create">
            <button className="border-solid border-2 p-2 bg-blue-700 text-white">
              Create Question
            </button>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          {questions?.map(
            ({
              _id,
              title,
              description,
              thingsDoneAndExpectations,
              attachments,
              topics,
              upVotes,
              downVotes,
              answers,
            }: QuestionType) => (
              <QuestionCard
              key={_id}
              _id={_id}
                title={title}
                description={description}
                thingsDoneAndExpectations={thingsDoneAndExpectations}
                attachments={attachments}
                topics={topics}
                upVotes={upVotes}
                downVotes={downVotes}
                answers={answers}
              />
            )
          )}
        </div>
      </div>
    </Card>
  );
};

export default withPortalAppBar(Question, {});
