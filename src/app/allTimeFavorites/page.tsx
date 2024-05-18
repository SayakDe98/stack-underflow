"use client";
import React, { useEffect, useState } from "react";
import { useQuestions } from "@/app/utils/hooks/useQuestions";
import Card from "../components/common/Card";
import withPortalAppBar from "../components/common/portalLayout";
import Link from "next/link";

const AllTimeFavoritesPage = () => {
  const { getPopularQuestions } = useQuestions();
  const [questions, setQuestions] = useState<Array<any>>([]);
  const handleQuestions = () => {
    const res = getPopularQuestions();
    res.then((a) => a.json().then((d) => setQuestions(d.data)));
  };
  useEffect(() => {
    handleQuestions();
  }, []);
  return (
    <Card>
      <div className="flex flex-col">
        <p className="text-3xl text-bold">All Time Favourite Questions</p>
        {questions?.map((question) => (
          <Link href={`/questions/${question._id}`}>
            <Card
              styles={{
                mb: 2,
              }}
            >
              <>
                <div className="inline-flex">
                  <div className="bg-blue-400 text-white px-2">
                    {question?.title}
                  </div>
                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: question?.description,
                  }}
                />
                <div>{question?.totalVotes} votes</div>
              </>
            </Card>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default withPortalAppBar(AllTimeFavoritesPage, {});
