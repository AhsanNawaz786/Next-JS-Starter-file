import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";


connect()

export default async function POST(request: NextRequest,) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody

        // Check if user exists
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({ error: "User not found" }, {status: 400})
        }

        // Check if password is correct
        const validCorrect = await bcryptjs.compare(password, user.password);
        if(!validCorrect){
            return NextResponse.json({ error: "Password incorrect" }, {status: 400})
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email

        }

        // Create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d"
        })

        //set token in user cookie
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token",
            token,
           { httpOnly: true,

           })
           return response;
            

    }  catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})

    }
}