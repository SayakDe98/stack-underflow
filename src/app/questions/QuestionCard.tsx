import Link from "next/link";
import { TopicType } from "../../../types/topic";
import Card from "../components/common/Card";
import { Vote } from "../../../types/question";

interface Answer {
  user: any;
  timestamp: Date;
  message: string;
  attachments: Array<any>;
}

export interface QuestionCardProps {
  _id?: string;
  title: string;
  description?: string;
  thingsDoneAndExpectations?: string;
  attachments?: Array<any>;
  topics?: TopicType[];
  upVotes?: Vote[];
  downVotes?: Vote[];
  answers?: Answer[];
}
const QuestionCard = ({
  _id,
  title,
  description,
  topics,
  upVotes,
  downVotes,
  answers,
}: QuestionCardProps) => {
  
  return (
    <Link href={`/questions/${_id}`}>
      <Card
        styles={{
          cursor: "pointer",
        }}
      >
        <div className="grid grid-cols-[100px_minmax(800px,auto)] gap-5">
          <div className="flex flex-col">
            <p className="flex justify-between px-2">
              <span>{(upVotes?.length || 0) + (downVotes?.length || 0)}</span>
              <span>votes</span>
            </p>
            <p className="flex justify-between px-2 border border-green-500 rounded bg-green-500 text-white">
              <span>{answers?.length ?? 0}</span>
              <span>answers</span>
            </p>
          </div>
          <div className="flex flex-col">
            <p
              dangerouslySetInnerHTML={{ __html: title }}
              className="text-xl"
            />
            <p dangerouslySetInnerHTML={{ __html: description ?? "" }} />
            <div className="flex gap-1">
              {topics?.map((topic) => (
                <span className="px-2 bg-blue-400 text-white border border-blue-400 rounded">
                  {topic?.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default QuestionCard;
