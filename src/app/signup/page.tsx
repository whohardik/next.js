"use client"

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { signupSchema } from "@/app/clinetvaildations/signup"
export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignUp = async () => {
        try {
            setLoading(true);
            // Validate user input
            const result = signupSchema.safeParse(user);

            if (!result.success) {
                const formattedErrors: any = result.error.format();

                const errorMessage = Object.keys(formattedErrors)
                    .map((key) => {
                        const error = formattedErrors[key];
                        if (error._errors && Array.isArray(error._errors)) {
                            return error._errors.join(", ");
                        } else {
                            return "Unknown error";
                        }
                    })
                    .join("\n");

                toast.error(errorMessage);
                return;
            }
            const response = await axios.post("/api/users/signup", user)
            if (response.data.success) {



                router.push("/login");
            } else {
                // Handle unexpected success response
                toast.error("Signup succeeded but an unexpected response was received.");
            }

        } catch (error: any) {

            toast.error(error.response.data.error)
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }

    }, [user])

    console.log(toast);

    return (

        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div><Toaster /></div>
            <h1>{loading ? "processing" : "signup"}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
            />
            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password" // changed from text to password for better security
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />
            <button
                onClick={onSignUp}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-black"
            >
                {buttonDisabled ? "no signup" : "signup"}
            </button>
            <Link href="/login">Visit login page</Link>
        </div>
    );
}
