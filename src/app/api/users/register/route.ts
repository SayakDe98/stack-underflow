import { connect } from "@/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import UserModel from "@/app/models/user.model";
import { z } from "zod";
const { User, validateUser } = UserModel;

connect();

export const POST = async (req: NextRequest) => {
    try {
        const requestBody = await req.json();
        try {
          validateUser(requestBody); // validate user
        } catch (error) {
            if(error instanceof z.ZodError) {
                return NextResponse.json({
                    message: error.issues[0].message
                }, {
                    status: 400
                })
            }            
        }
        //  if (error) {
        //    return NextResponse.json({ message: error.details[0].message}, { status: 400 });
        //  }
        const salt = await bcrypt.genSalt(10); // generate salt
        requestBody.password = await bcrypt.hash(requestBody.password, salt); // generate encrypted password
        const userAlreadyExists = await User.findOne({ email: requestBody.email });
        if(userAlreadyExists) {
            return NextResponse.json({ message: "User already registered with this email." }, { status: 400 });
        }
        const user = await User.create(requestBody);
        return NextResponse.json({
            message: "User created successfully.",
            data: user
        }, {
            status: 201
        });
    } catch (error) {
        return NextResponse.json({
            message: (error as Error)?.message
        }, {
            status: 500
        })
    }
}