import mongoose from "mongoose";

export async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Server Connected');
    } catch (error) {
        console.log(error);
    }
}