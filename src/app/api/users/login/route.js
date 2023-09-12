
import User from "@/model/userModel";
import { connectDB } from "@/config/dbConfig";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";
import  jwt  from "jsonwebtoken";
connectDB()

export async function POST(request){
    try {
      const reqBody= await request.json()
      const user = await User.findOne({email: reqBody.email}) ;
      if(!user){
        throw new Error("User not Found")
      } 
      const validPassword= await bcrypt.compare(reqBody.password, user.password)
      if(!validPassword){
        throw new Error("Password Not Valid")
      }

      const response= NextResponse.json({
        message: "Login Successful"
      })
      const Token= jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})


      
            response.cookies.set("token", Token, {
                path: '/',
                httpOnly: true,
                expires: new Date(Date.now()+ 1000 * 86400),
                secure: true
            } )
      
      return response
     

    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 400})
    }
}