import { Schema } from "mongoose";
import mongoose from "mongoose";
import { userInterface } from "../interfaces/userInterface";

const userSchema = new Schema({
    name:{
        required: true,
        type : String
    },
    email:{
        required: true,
        type: String
    },
    phoneNumber:{
        required: true,
        type: String
    },
    password:{
        requrird: true,
        type: String
    },
    is_admin:{
        required: true,
        type: Boolean,
        default: false
    },
    profile:{
        type:String
    }
})

export default mongoose.model<userInterface>('user',userSchema)