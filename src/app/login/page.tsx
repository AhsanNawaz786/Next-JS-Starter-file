"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast"




export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password:"",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin =async () => {
       try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);

        console.log(response.data, "success");
        toast.success("User logged in successfully");
        router.push("/profile");


       } catch (error: any) {
        console.log("Login failed", error.message);
        toast.error(error.message);
        
       }finally{
        setLoading(false);
       }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [user]);

    return(
        <div className="flex justify-center items-center flex-col min-h-screen py-2 bg-slate-700 text-white">
           <h1>Login</h1>
           <hr />
           
            <label htmlFor="email">Email</label>
           <input className="text-black p-2 border border-gray-300 rounded-lg mb-4"
           id="email" type="text" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="email"
            />
            <label htmlFor="username">Password</label>
           <input className="text-black p-2 border border-gray-300 rounded-lg mb-4"
           id="password" type="text" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="password"
            />
            <button 
           onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4">Login here</button>
            <Link href="/signup">Visit Signup Page</Link>
        </div>
    )
}