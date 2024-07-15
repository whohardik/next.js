import { connect } from "@/dbConfig/dbCongig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/helpers/mailer"
import bcrypt from "bcryptjs"
connect()
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // Check if user exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "This user is already present" }, { status: 400 });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the new user
        const savedUser = await newUser.save();
        // send email for verfication 
        const send_mail = await sendEmail({ userId: savedUser._id, email, emailType: "VERIFY" });
        console.log("🚀 ~ POST ~ send_mail:", send_mail)
        return NextResponse.json({
            message: "User created",
            success: true,
            savedUser
        });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}


