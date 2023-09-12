import Hotel from "@/model/hotelModel";
import { connectDB } from "@/config/dbConfig";
import { NextResponse } from "next/server";
import { validateJWTToken } from "@/helpers/tokenValidation";
connectDB()

export async function POST(request){
    try {
   const admin= await validateJWTToken(request)
   const reqBody= await request.json()
   reqBody.admin= admin
   const hotel= await Hotel.create(reqBody)
   return NextResponse.json({message: "Hotel Added Successfully", hotel})

        
    } catch (error) {
        return NextResponse.json({
            
            message: error.message,
           
        }, {status: 500})
    }
}

export async function GET(request){
    try {
        const hotels= await Hotel.find()
        return NextResponse.json({data: hotels})
    } catch (error) {
        return NextResponse.json({
            
            message: error.message,
           
        }, {status: 400})
    }
}

