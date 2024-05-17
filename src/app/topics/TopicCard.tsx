import React from "react";
import { TopicType } from "../../../types/topic";
import Card from "../components/common/Card";
import Link from "next/link";

const TopicCard = ({ name, description, _id }: TopicType) => {
  return (
    <Link href={`/topics/${_id}`}>
      <Card
        styles={{
          cursor: "pointer",
        }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex">
            <span className="px-2 bg-blue-400 text-white border border-blue-400 rounded">
              {name}
            </span>
          </div>

          <p
            dangerouslySetInnerHTML={{
              __html: description || "",
            }}
          />
        </div>
      </Card>
    </Link>
  );
};

export default TopicCard;
