import Hotel from "@/model/hotelModel";
import { connectDB } from "@/config/dbConfig";
import { NextResponse } from "next/server";
import { validateJWTToken } from "@/helpers/tokenValidation";
connectDB()

export async function PUT(request){
    try {
        const admin= await validateJWTToken(request)
        const reqBody= await request.json()
        await Hotel.findByIdAndUpdate(reqBody._id, reqBody);
        return NextResponse.json({message: "Hotel Details Updated Successfully"})
        
    } catch (error) {
        return NextResponse.json({
            
            message: error.message,
           
        }, {status: 400})
    }
}

export async function DELETE(request, {params}){
    try {
        const admin= await validateJWTToken(request)
        await Hotel.findByIdAndDelete(params.hotelId)
        return NextResponse.json({message: "Hotel Deleted Successfully"})
        
    } catch (error) {
        return NextResponse.json({
            
            message: error.message,
           
        }, {status: 400})
    }
    }

export async function GET(request, {params}){
    try {
       const hotel= await Hotel.findById(params.hotelId)
        return NextResponse.json({data: hotel})
        
    } catch (error) {
        return NextResponse.json({
            
            message: error.message,
           
        }, {status: 400})
    }
    }

