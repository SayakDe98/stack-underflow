"use client";
import React, { useEffect, useState } from "react";
import Card from "../common/Card";
import { useTopics } from "@/app/utils/hooks/useTopics";
import Link from "next/link";

const Topics = () => {
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
    <Link href="/topics">
      <Card>
        <div>
          <div className="text-3xl text-bold">Topics</div>
          {topicsData?.map((topic) => (
            <div>{topic?.name}</div>
          ))}
        </div>
      </Card>
    </Link>
  );
};

export default Topics;
