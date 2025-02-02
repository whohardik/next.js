import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";
import { request } from "http";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken: any = Jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_URL!)
        return decodedToken.id
    } catch (error: any) {
        throw new Error(error.message)
    }
}