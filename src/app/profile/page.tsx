"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing")
    const logout = () => {

        try {
            axios.get("api/users/logout")
            toast.success('logout sucessfully')
            router.push("/login")
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        setData(res.data.data._id)

    }

    return (
        <div className="flex flex-col items-center justify min-h-screen py-2">
            <h1>
                Profile
            </h1>
            <hr />
            <p>Profile Page</p>
            <hr />

            <h2>
                {data === "nothing" ? "nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>

            <button
                onClick={getUserDetails}
                className=" bg-green-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            > getUserDtails</button>
            <button
                onClick={logout}
                className=" bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            > logout</button>

        </div>
    )
}