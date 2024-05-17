import { NextRequest, NextResponse } from "next/server";
import questionModel from "@/app/models/question.model";
import topicModel from "@/app/models/topic.model";
const { Question } = questionModel;

export const GET = async (req: NextRequest) => {
  try {
    const questionId = req.url.split("/")[5];

    const questionDetails = await Question.findOne({
      _id: questionId,
    }).populate(
      "upVotes.user downVotes.user answers.user answers.comments.user"
    );
    return NextResponse.json(
      {
        data: questionDetails,
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

export const PUT = async (req: NextRequest) => {
  try {
    const requestBody = await req.json();
    const questionId = req.url.split("/")[5];

    const topic = await Question.updateOne({ _id: questionId }, requestBody);
    return NextResponse.json(
      {
        message: "Topic updated successfully",
        data: topic,
      },
      {
        status: 201,
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
