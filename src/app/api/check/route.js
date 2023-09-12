import mongoose from "mongoose";
import { connectDB } from "@/config/dbConfig";
import Booking from "@/model/bookingHotelModel";
import { NextResponse } from "next/server";
import { message } from "antd";

connectDB()

export async function POST(request){
    try {
        let slotAvailable= true
        const {fromSlot, toSlot, hotel}= await request.json()
        const bookings= await Booking.find({
            hotel: hotel,
            $or: [
                {fromSlot: { $gte: fromSlot, $lte: toSlot}},
                {toSlot: {$gte: fromSlot, $lte: toSlot}}
            ]
        })
        if(bookings.length > 0){
            slotAvailable= false
        }
        return NextResponse.json({
            success: slotAvailable
        })

    } catch (error) {
         return NextResponse.json({
            message: error.message,
           
        }, {status: 400})
    }
}