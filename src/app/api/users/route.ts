import connect from "@/app/lib/db/mongodb";
import User from "@/app/lib/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const { userName, email, password } = await request.json();
        const user = await User.findOne({ email: email });
        console.log(email);
        if(user){
            return NextResponse.json({
                message:"user already exist",
                status:400
            })
        }
        const newUser = new User({ userName, email, password });
        await newUser.save();
        return NextResponse.json({
            message: "user added sucssesfully!",
            user: newUser,
            status: 201
        });
    } catch (error) {
        return NextResponse.json({
            message: `${error}`,
            status: 401
        });
    }
}