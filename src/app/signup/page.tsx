"use client"

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    });

    const onSignUp = async () => {
        // Sign-up logic goes here
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Signup</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
            />
            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                type="password" // changed from text to password for better security
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />
            <button
                onClick={onSignUp}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                singup
            </button>
            <Link href="/login">Visit login page</Link>
        </div>
    );
}
