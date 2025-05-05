import { userInterface } from "../interfaces/userInterface";
import User from "../models/User";


export class AdminRepository {

    async findByEmail(email:string):Promise<userInterface | null>{
        return await User.findOne({email})
    }

    async findAllUsers():Promise<userInterface[] | null>{
        return await User.find()
    }
}