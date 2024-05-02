import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = () => {
    try {
        const cookieStore = cookies();
        cookieStore.delete("token");
        return NextResponse.json({
            message: "Log out successful"
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: (error as Error)?.message
        }, {
            status: 500
        })
    }    
}