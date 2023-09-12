import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }


}, {
    timestamps: true
})

if(mongoose.models.users){
    const userModel= mongoose.model("users")
    mongoose.deleteModel(userModel.modelName)
}

const User= mongoose.model("users", userSchema)
export default User