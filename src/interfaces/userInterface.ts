import { Document } from "mongoose";


export interface userInterface extends Document {
    _id:string,
    email : string,
    name : string,
    phoneNumber: string,
    password: string,
    profile: string,
    is_admin: boolean
}