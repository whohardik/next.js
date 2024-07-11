import { connect } from "@/dbConfig/dbCongig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // check is user exist
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "No user found with this eamil!" }, { status: 400 })
        }

        // verify password
        const vaildatePassword = await bcrypt.compare(password, user.password);
        if (!vaildatePassword) {
            return NextResponse.json({ error: "Invaild password" }, { status: 400 })
        }
        const tokenData = {
            id: user._id,
            username: user.username
        }
        const token = await jwt.sign(tokenData, process.env.NEXT_PUBLIC_TOKEN_URL!, { expiresIn: "1d" })
        const response = NextResponse.json({
            message: "Login sucessful",
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

