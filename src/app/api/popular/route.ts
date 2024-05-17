import { NextRequest, NextResponse } from "next/server";
import QuestionModel from "@/app/models/question.model";
const { Question } = QuestionModel;

export const GET = async (_: NextRequest) => {
  try {
    const data = await Question.aggregate([
      {
        $project: {
          title: 1,
          totalVotes: {
            $subtract: [{ $size: "$upVotes" }, { $size: "$downVotes" }],
          },
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
