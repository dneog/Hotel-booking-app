import { NextResponse } from "next/server";
import { cookies } from "next/headers";



export async function GET(){

    try {
        const Cookies= new cookies()
        await Cookies.delete("token")
        
        const response= NextResponse.json({
            data: null, message: 'Logout Successful'
        }, {status: 200})

       
        return response
    } catch (error) {
        return NextResponse.json({data: null, message: error.message}, {status: 500})
    }
}