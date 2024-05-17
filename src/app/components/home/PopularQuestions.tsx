"use client";
import React, { useEffect, useState } from "react";
import Card from "../common/Card";
import { useQuestions } from "@/app/utils/hooks/useQuestions";

const PopularQuestions = () => {
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
        <p className="text-3xl text-bold">Popular Questions</p>
        {questions?.map((question) => (
          <div>{question?.title}</div>
        ))}
      </div>
    </Card>
  );
};

export default PopularQuestions;
