import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connect } from "@/dbConfig";
import QuestionModel from "@/app/models/question.model";
import mongoose from "mongoose";
const { validateQuestion, Question } = QuestionModel;

connect();

export const POST = async (req: NextRequest) => {
  try {
    const requestBody = await req.json();
    try {
      validateQuestion(requestBody);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            message: error.issues[0].message,
          },
          {
            status: 400,
          }
        );
      }
    }
    const updatedRequestBody = {
      ...requestBody,
      topics: requestBody.topics.map(
        (topic: any) => new mongoose.Types.ObjectId(topic)
      ),
    };
    const question = await Question.create(updatedRequestBody);
    return NextResponse.json(
      {
        message: "Question created successfully",
        data: question,
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

export const GET = async (req: NextRequest) => {
  try {
    const data = await Question.find({}).populate("topics");
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
