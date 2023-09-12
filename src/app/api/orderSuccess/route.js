import { connectDB } from "@/config/dbConfig";
import { validateJWTToken } from "@/helpers/tokenValidation";
import Booking from "@/model/bookingHotelModel";
import { NextResponse } from "next/server";

connectDB()



export async function POST(request){
    try {
       
        const reqBody= await request.json()

        await Booking.create(reqBody)
        return NextResponse.json({
            message: 'Booking Successful'
        })

     
    } catch (error) {
        console.log(error);
        return NextResponse.json({
           
            message: error.message,
           
        }, {status: 500})

    }
}

export async function GET(request){

    try {
      const userId= await validateJWTToken(request)
      const {searchParams}= new URL(request.url)
      const user= searchParams.get('current') 
      const userBookings= await Booking.find({user})
      return NextResponse.json({
        data: userBookings
      })
    } catch (error) {
       console.log(error);
          return NextResponse.json({
             
              message: error.message,
             
          }, {status: 500})
    }
  }