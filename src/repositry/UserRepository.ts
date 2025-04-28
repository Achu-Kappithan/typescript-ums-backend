import { userInterface } from "../interfaces/userInterface";
import User from "../models/User";


export class UserRepository {
    async findByEmail(email:string):Promise<userInterface | null>{
        return await User.findOne({email})
    }

    async findByUsername(username:string):Promise<userInterface | null >{
        return await User.findOne({username})
    }

    async CreateUser(userData:Partial<userInterface>):Promise<userInterface>{
        const user = new User(userData);
        return  await user.save();
    }
}