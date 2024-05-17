import userModel from "@/app/models/user.model";
import { connect } from "@/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const { User } = userModel;

connect();

export const POST = async (req: NextRequest) => {
  try {
    const requestBody = await req.json();
    if (!requestBody.email) {
      return NextResponse.json(
        {
          message: "Email is required",
        },
        {
          status: 400,
        }
      );
    }
    if (!requestBody.password) {
      return NextResponse.json(
        {
          message: "Password is required",
        },
        {
          status: 400,
        }
      );
    }
    const user = await User.findOne({ email: requestBody.email });
    if (!user) {
      return NextResponse.json(
        {
          message: "Password or Email is incorrect",
        },
        {
          status: 400,
        }
      );
    }
    const decodedPassword = await bcrypt.compare(
      requestBody.password,
      user.password
    );
    if (decodedPassword) {
      const token = jwt.sign(
        {
          email: user.email,
          _id: user._id,
        },
        process.env.JWT_SECRET
      );
      const cookieStore = cookies();
      cookieStore.set("token", token);
      return NextResponse.json({
        message: "User logged in successfully",
      });
    } else {
      return NextResponse.json(
        {
          message: "Password or Email is incorrect",
        },
        {
          status: 400,
        }
      );
    }
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
