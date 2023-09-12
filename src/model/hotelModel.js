
import mongoose from "mongoose";

const hotelSchema= new mongoose.Schema({
    about: {
        type: String,
        require: true
    },
    about1: {
        type: String,
        require: true
    },
    about2: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
   
    rent: {
        type: Number,
        require: true
    },
   
   
   
    isActive: {
        type: Boolean,
        require: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    }

}, {timestamps: true})

if(mongoose.models.hotels){
    const hotelModel= mongoose.model("hotels")
    mongoose.deleteModel(hotelModel.modelName)
}

const Hotel= mongoose.model("hotels", hotelSchema)
export default Hotel

