
import User from "@/model/userModel";
import { connectDB } from "@/config/dbConfig";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";
connectDB()

export async function POST(request){
    try {
      const reqBody= await request.json()
      const existingUser= await User.findOne({email: reqBody.email})  
      if(existingUser){
        throw new Error(' User Already Exists')
      }
      const salt= await bcrypt.genSalt(10)
      const hashedPassword= await bcrypt.hash(reqBody.password, salt)
      reqBody.password= hashedPassword
      await User.create(reqBody)
      return NextResponse.json({
        message: 'User Created Successfully'
      })

    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 400})
    }
}