import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hashed token 
        console.log("email>>>>>>>>>>>>>>>>>>>s", emailType);
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordExpiry: Date.now() + 3600000
            })

        }

        var transport = nodemailer.createTransport({
            host: process.env.NEXT_PUBLIC_SMTP_HOST,
            port: 2525,
            auth: {
                user: process.env.NEXT_PUBLIC_SMTP_USER,
                pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD
            }
        });
        const mailOptions = {
            from: "hardik.updahyay@qualhon.com",
            to: email,
            subject: emailType === "VERIFY" ? "verify email" : "Reset your password",
            html: `<p> Click <a href  = "${process.env.NEXT_PUBLIC_DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>
                `

        }
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }
}