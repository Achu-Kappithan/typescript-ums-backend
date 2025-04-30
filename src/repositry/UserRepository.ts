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

    async updateProfilePicture(userId: string, profilePicture: string): Promise<userInterface | null> {
        console.log("update profile repos works",userId)
        return await User.findByIdAndUpdate(
          userId,
          { profile: profilePicture }, 
          { new: true }
        );
    }

      


}