import { getDataFromToken } from "@/helpers/getDataFormToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbCongig";

connect()
export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user_data = await User.findOne({ _id: userId }).select("-password")
        return NextResponse.json({
            message: "User found",
            data: user_data
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}