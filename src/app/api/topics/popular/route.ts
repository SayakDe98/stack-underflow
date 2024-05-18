import { NextRequest, NextResponse } from "next/server";
import questionModel from "@/app/models/question.model";
const { Question } = questionModel;

export const GET = async (_: NextRequest) => {
  try {
const data = await Question.aggregate([
  {
    $addFields: {
      topics: {
        $map: {
          input: "$topics",
          as: "topic",
          in: { $toObjectId: "$$topic" },
        },
      },
    },
  },
  {
    $unwind: {
      path: "$topics",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: "topics",
      localField: "topics",
      foreignField: "_id",
      as: "topic",
    },
  },
  {
    $unwind: "$topic",
  },
  {
    $project: {
      topicId: "$topic._id",
      topic: "$topic.name",
      topicDescription: "$topic.description",
      totalVotes: {
        $add: [
          { $size: "$upVotes" },
          { $size: "$downVotes" },
          { $sum: "$answers.upVotes" },
          { $sum: "$answers.downVotes" },
        ],
      },
    },
  },
  {
    $group: {
      _id: {
        topicId: "$topicId",
        topic: "$topic",
        topicDescription: "$topicDescription",
      },
      totalVotes: { $sum: "$totalVotes" },
    },
  },
  {
    $sort: { totalVotes: -1 },
  },
  {
    $project: {
      _id: 0,
      topicId: "$_id.topicId",
      topic: "$_id.topic",
      topicDescription: "$_id.topicDescription",
      totalVotes: 1,
    },
  },
]);


    return NextResponse.json(
      {
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error)?.message,
      },
      {
        status: 500,
      }
    );
  }
};
