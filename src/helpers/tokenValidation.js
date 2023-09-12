import jwt  from "jsonwebtoken";
export async function validateJWTToken(request){
    const token = request.cookies.get('token')?.value

    try {
        if(!token){
            throw new Error("No Token Found")
        }

        const decodedToken= jwt.verify(token, process.env.JWT_SECRET)
        const userId= decodedToken._id
        return userId
        
    } catch (error) {
        return error
    }
}