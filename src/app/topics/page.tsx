"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/common/Card";
import { useTopics } from "../utils/hooks/useTopics";
import { TopicType } from "../../../types/topic";
import TopicCard from "./TopicCard";
import Link from "next/link";
import withPortalAppBar from "../components/common/portalLayout";

const TopicsPage = () => {
  const { getTopics } = useTopics();
  const [topicsData, setTopicsData] = useState<Array<any>>([]);
  const handleGetTopics = () => {
    const res = getTopics({});
    res.then((a) => a.json().then((d) => setTopicsData(d.data)));
  };
  useEffect(() => {
    handleGetTopics();
  }, []);
  return (
    <Card>
      <div>
        <p className="font-bold text-3xl mb-2">Topics</p>
        <p className="mb-2">
          A topic is a keyword or label that categorizes your question with
          other, similar questions. Using the right topics makes it easier for
          others to find and answer your question.
        </p>
        <Link href="/topics/create">
          <button className="mb-2 border-solid border-2 p-2 bg-blue-700 text-white">
            Create Topic
          </button>
        </Link>
        <div></div>
        <div className="grid grid-cols-2 gap-2">
          {topicsData?.map(({ name, description, _id }: TopicType) => (
            <TopicCard
              key={_id}
              _id={_id}
              name={name}
              description={description}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default withPortalAppBar(TopicsPage, {});
