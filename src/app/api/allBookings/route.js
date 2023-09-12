import { connectDB } from "@/config/dbConfig";
import { validateJWTToken } from "@/helpers/tokenValidation";
import Booking from "@/model/bookingHotelModel";
import { NextResponse } from "next/server";
connectDB()

export async function GET(request){

    try {
      const userId= await validateJWTToken(request)
     
      const userBookings= await Booking.find().populate('hotel')
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