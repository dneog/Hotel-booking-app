import mongoose from "mongoose";

const bookingSchema= new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotels',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fromSlot: {
        type: Date, 
        required: true
    },
    toSlot: {
        type: Date, 
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    pin: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
   
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: 'approved'
    }
}, {timestamps: true})

if(mongoose.models.bookings){
    const bookingModel= mongoose.model("bookings")
    mongoose.deleteModel(bookingModel.modelName)
}

const Booking= mongoose.model("bookings", bookingSchema)
export default Booking

