import { NextResponse } from "next/server";


// clearing the token for logout

export async function GET(){
    try {
        const response = NextResponse.json({
            message: "logout succesful",
            success: true,
        })

        // response can interact with cookie
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })

        return response;
    }
    catch(error:  any){
       return NextResponse.json(error.message),{status: 500};
    }
}