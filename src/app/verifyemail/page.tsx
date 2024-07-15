"use client"

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
        } catch (error: any) {
            setError(true)
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")

    })
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500">{token ? `${token}` : `no token`}</h2>
            {verified && (
                <div>
                    <h2 className="text-2xl">Email verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}
            v  {error && (
                <div>
                    <h2 className="text-2xl bg-red-500">Email verified</h2>

                </div>
            )}
        </div>
    )
}
