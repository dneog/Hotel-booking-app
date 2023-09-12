import { validateJWTToken } from "@/helpers/tokenValidation";
import { connectDB } from "@/config/dbConfig";
import User from "@/model/userModel";
import { NextResponse } from "next/server";
connectDB()

export async function GET(request){
    try {
        const userId= await validateJWTToken(request)
        const user= await User.findById(userId).select("-password")
        console.log(user);
        return NextResponse.json({
            data: user,
            message: "User Find Successfully",

        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            data: null,
            message: error.message,
           
        }, {status: 500})

        
    }
}