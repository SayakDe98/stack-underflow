import { NextRequest, NextResponse } from "next/server";
import questionModel from "@/app/models/question.model";
import topicModel from "@/app/models/topic.model";
import mongoose from "mongoose";
const { Question } = questionModel;
const { Topic } = topicModel;
export const GET = async (req: NextRequest) => {
  try {
    const topicId = req.url.split("/")[5];
    const request = await Question.find({
      topics: topicId || new mongoose.Types.ObjectId(topicId),
    }).populate("topics");
    const topicDetails = await Topic.findOne({
      _id: topicId,
    });
    return NextResponse.json(
      {
        data: {
          questions: request,
          topicDetails,
        },
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
