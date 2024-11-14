import connect from "@/app/lib/db/mongodb";
import User from "@/app/lib/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const { email, password } = await request.json();
        const user = await User.findOne({ email: email });
        if (password !== user?.password)
            return NextResponse.json({
                message: "incorrect password",
                user: user,
                status: 400
            })
        if (user) {
            return NextResponse.json({
                message: "user found",
                user: user,
                status: 200
            })
        }
        else {
            return NextResponse.json({
                message: "user is not defined",
                status: 401
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            massege: "Error",
            status: 400
        })
    }
}