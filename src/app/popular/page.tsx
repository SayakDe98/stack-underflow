"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/common/Card";
import withPortalAppBar from "../components/common/portalLayout";
import { useTopics } from "../utils/hooks/useTopics";
import Link from "next/link";

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
          <Link href={`/topics/${topic?.topicId}`}>
            <Card
              styles={{
                mb: 2,
              }}
            >
              <div className="flex flex-col">
                <div className="inline-flex">
                  <div className="bg-blue-400 text-white px-2">
                    {topic?.topic}
                  </div>
                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: topic?.topicDescription,
                  }}
                />
                <div>{topic?.totalVotes} votes</div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default withPortalAppBar(PopularPage, {});
