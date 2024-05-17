"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/common/Card";
import withPortalAppBar from "../components/common/portalLayout";
import { useTopics } from "../utils/hooks/useTopics";

const PopularPage = () => {
  const { popularTopics } = useTopics();
  const [topics, setTopics] = useState<Array<any>>([]);
  const handleQuestions = () => {
    const res = popularTopics();
    res.then((a) => a.json().then((d) => setTopics(d.data)));
  };
  useEffect(() => {
    handleQuestions();
  }, []);
  return (
    <Card>
      <div className="flex flex-col">
        <p className="text-3xl text-bold">Popular Topics</p>
        {topics?.map((topic) => (
          <>
            <div>{topic?._id}</div>
            <div>{topic?.totalVotes}</div>
          </>
        ))}
      </div>
    </Card>
  );
};

export default withPortalAppBar(PopularPage, {});
