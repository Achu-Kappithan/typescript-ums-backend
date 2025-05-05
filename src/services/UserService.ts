import { userInterface } from "../interfaces/userInterface";
import { UserRepository } from "../repositry/UserRepository";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/jwtHelper";



export  class userService {
    private userRepository :UserRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }

    // for register user

    async rigisteruser (name:string,email:string,password:string,phoneNumber:string){
        console.log("servicedata",name,email,phoneNumber,password)
        const existingEmail = await this.userRepository.findByEmail(email);

        if(existingEmail){
            throw new Error('User Alredy Exists')
        }

        const existingName = await this.userRepository.findByUsername(name);

        if(existingName){
            throw new Error('Username Alredy in User chooose another one')
        } 

        const hashpassword = await bcrypt.hash(password,10)
        console.log(hashpassword)

        const userData:Partial<userInterface>={
            name:name,
            email:email,
            password:hashpassword,
            phoneNumber: phoneNumber,
        }

        const user = await  this.userRepository.CreateUser(userData);
        return {user}
    }

    // for login  user

    async loginUser(email:string , password:string):Promise<object>{
        const user = await this.userRepository.findByEmail(email)
        
        if(!user){
            throw new Error ('Invalid Email or Password')
        }

        const isPassword = await bcrypt.compare(password,user.password)

        if(!isPassword){
            throw new Error ('Invalid Email or Password')
        }
        const jwtToken = generateToken({userid:user._id, email:user.email,is_admin:user.is_admin})

        return {jwtToken};
    }


    async updateProfilePicture(userId: string, file: Express.Multer.File): Promise<userInterface> {
        if (!file) {
          throw new Error('No file uploaded');
        }
        const profilePicture = `src/uploads/${file.filename}`;
        console.log("profilename",profilePicture)
    
        const updatedUser = await this.userRepository.updateProfilePicture(userId, profilePicture);
        console.log("responce from the db in service file",updatedUser)
    
        if (!updatedUser) {
          throw new Error('User not found');
        }
    
        return updatedUser;
      }

      async getUserDetails(userId:string):Promise<userInterface>{
        const user = await this.userRepository.findbyId(userId)
        if(!user){
            throw new Error('User Not found')
        }
        return user
      }


}