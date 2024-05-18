"use client";
import QuestionCard from "@/app/questions/QuestionCard";
import { useTopics } from "@/app/utils/hooks/useTopics";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { QuestionType } from "../../../../types/question";
import withPortalAppBar from "@/app/components/common/portalLayout";

const Topic = () => {
  const params = useParams();
  console.log("params", params);
  const { getTopic } = useTopics();
  const [questions, setQuestions] = useState<Array<any>>([]);
  const [topicDetails, setTopicDetails] = useState<any>();

  const handleGetTopic = () => {
    const res = getTopic((params?.topicId as string) || "");
    res.then((a) =>
      a.json().then((d) => {
        setQuestions(d.data.questions);
        setTopicDetails(d.data.topicDetails);
      })
    );
  };
  useEffect(() => {
    handleGetTopic();
  }, []);
  return (
    <div>
      <div className="text-3xl mb-2">
        Questions tagged [{topicDetails?.name}]
      </div>
      <p
        dangerouslySetInnerHTML={{
          __html: topicDetails?.description,
        }}
      />
      <div>{questions?.length || 0} questions</div>
      <div className="flex flex-col justify-center items-center">
        {questions.map(
          ({ _id, title, description, upVotes, downVotes, answers }: QuestionType) => (
            <QuestionCard
              key={_id}
              _id={_id}
              title={title}
              description={description}
              upVotes={upVotes}
              downVotes={downVotes}
              answers={answers}
            />
          )
        )}
      </div>
    </div>
  );
};

export default withPortalAppBar(Topic, {});
