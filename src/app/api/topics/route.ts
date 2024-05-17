import { NextRequest, NextResponse } from "next/server";
import TopicModel from "@/app/models/topic.model";
import { z } from "zod";
import { connect } from "@/dbConfig";
const { validateTopic, Topic } = TopicModel;

connect();

export const POST = async (req: NextRequest) => {
  try {
    const requestBody = await req.json();
    try {
      validateTopic(requestBody);
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
    const topic = await Topic.create(requestBody);
    return NextResponse.json(
      {
        message: "Topic created successfully",
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

export const GET = async (_: NextRequest) => {
  try {
    const request = await Topic.find({});
    return NextResponse.json(
      {
        data: request,
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
