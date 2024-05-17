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
          topic: "$topic.name",
          topicDetails: "$topic",
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
          _id: "$topic",
          totalVotes: { $sum: "$totalVotes" },
        },
      },
      { $sort: { totalVotes: -1 } },
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
