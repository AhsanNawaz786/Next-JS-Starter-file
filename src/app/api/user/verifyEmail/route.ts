import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { log } from "console";



connect()

export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);


// find user based on token
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({error: 'User not found'}, {status: 400})
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({message: 'User verified successfully'});


    } catch (error: any) {
        return NextResponse.json({error: error.message});
    }
}
// TODO forgot password 