// utils/validationSchema.js
import { z } from "zod";

export const signupSchema = z.object({
    email: z.string()
        .email("Invalid email address")
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email must be a valid email address"),
    password: z.string()
        .min(6, "Password must be at least 6 characters long")
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Password must contain at least one letter and one number"),
    username: z.string()
        .min(1, "Username is required")
        .regex(/^[a-zA-Z0-9_]+$/, "Username must contain only letters, numbers, and underscores"),
});
