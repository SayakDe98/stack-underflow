import { NextRequest, NextResponse } from "next/server";
import PostModel from "@/app/models/post.model";
import { z } from "zod";
import { connect } from "@/dbConfig";
const { validatePost, Post } = PostModel;

connect();
// TODO: Create mappers and dto

export const POST = async (req: NextRequest) => {
  try {
    const requestBody = await req.json();
    try {
      validatePost(requestBody);
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
    const post = await Post.create(requestBody);
    return NextResponse.json(
      {
        message: "Post created successfully",
        data: post,
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
    console.log(req, "REQUEST PROMISE");
    const request = await req.json();
    console.log(request, "REQUEST");
    return NextResponse.json(
      {
        data: "Hi",
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
