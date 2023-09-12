import { connectDB } from "@/config/dbConfig";
import { validateJWTToken } from "@/helpers/tokenValidation";
import User from "@/model/userModel";

import { NextResponse } from "next/server";
connectDB()

export async function PUT(request, {params}){
    try {
        const userId= await validateJWTToken(request)
        const reqBody= await request.json()
        const updateProfile= await User.findByIdAndUpdate(params.userID, reqBody)
        return NextResponse.json({
            message: 'Profile Updated Successfully',
            data: updateProfile
        })
    } catch (error) {
        return NextResponse.json({
           
            message: error.message,
           
        }, {status: 500})
    }
}