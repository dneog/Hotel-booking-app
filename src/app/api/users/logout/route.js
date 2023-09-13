import { NextResponse } from "next/server";


export async function GET(){
    try {
        const response= NextResponse.json({
            data: null, message: 'Logout Successful'
        }, {status: 200})

        response.cookies.delete("token", {
            
                path: '/',
                httpOnly: true,
        })
        return response
    } catch (error) {
        return NextResponse.json({data: null, message: error.message}, {status: 500})
    }
}