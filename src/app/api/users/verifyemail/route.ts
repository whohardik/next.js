import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbCongig";
import { error } from "console";
connect()
export async function POST(request: NextRequest) {
    try {


        const reqBody = await request.json();
        const token = reqBody;

        if (!token) {
            throw new Error("token is empty")
        }
        const user = await User.findOne({
            verifyToken: token.token
            // verifyTokenExpiry: { $gt: Date.now() }
        })


        if (!user) {
            return NextResponse.json({ message: "Invaild token" }, { status: 400 })
        }

        user.isVerified = true;
        user.verifyToken = undefined,
            user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        }, { status: 200 })
    } catch (error: any) {
        console.log(error, "hdjshdsj");

        throw new Error(error.message)
    }
}