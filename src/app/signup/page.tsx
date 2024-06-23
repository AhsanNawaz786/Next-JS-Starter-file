"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function SignupPage() {
    const router = useRouter();
    
    const [user, setUser] = React.useState({
        email: "",
        password:"",
        username:"",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log(response.data, "success");
            router.push("/profile");
        
        } catch (error:any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
            
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    
    }, [user])

    

    return(
        <div className="flex justify-center items-center flex-col min-h-screen py-2">
           <h1>{loading ? "Processing" : "Signup"}</h1>
           <hr />
           <label htmlFor="username">Username</label>
           <input className="p-2 border border-gray-300 rounded-lg mb-4"
           id="username" type="text" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} placeholder="username"
            />
            <label htmlFor="email">Email</label>
           <input className="p-2 border border-gray-300 rounded-lg mb-4"
           id="email" type="text" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="email"
            />
            <label htmlFor="username">Password</label>
           <input className="p-2 border border-gray-300 rounded-lg mb-4"
           id="password" type="text" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="password"
            />
            <button 
           onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4">{buttonDisabled ? "No Signup" : "Signup"}</button>
            <Link href="/login">Visit Login Page</Link>
        </div>
    )
}