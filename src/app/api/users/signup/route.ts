import { connect } from "@/dbConfig/dbCongig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/helpers/mailer"
import { createUserSchema } from "@/servervaildation/signup"
import bcrypt from "bcryptjs"
import { z } from "zod"
connect()
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const validatedData: any = createUserSchema.parse(reqBody);

        if (!validatedData) {
            // Handle validation errors here
            const errors = validatedData.error.flatten().fieldErrors;
            const errorMessage = errors.map((err: { path: any[]; message: any }) => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            return NextResponse.json({ error: errorMessage }, { status: 400 });
        }

        const { username, email, password } = validatedData;

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

        return NextResponse.json({
            message: "User created",
            success: true,
            savedUser
        });
    } catch (error: any) {
        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            const errorMessage = error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            return NextResponse.json({ error: errorMessage }, { status: 400 });
        }

        // Handle other errors
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



