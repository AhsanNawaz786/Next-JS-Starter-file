
import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest){
    try {//getting user info from id in token
        const userId = await getDataFromToken(request);
        User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            message: "User found",
            data: User
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400});
        
    }
}