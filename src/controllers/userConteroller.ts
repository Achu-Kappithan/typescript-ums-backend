import { Request, Response } from "express";
import { userService } from "../services/UserService";
import { AuthRequest } from "../middleware/auth.middleware";


export class userController {
    private userservice: userService;

    constructor(){
        this.userservice = new userService()
    }

    // for registration

    async registerUser( req:Request, res:Response){
        console.log("regisert user works")
        const { name,email,password,phoneNumber}= req.body
        console.log("data from body",req.body)


        try{
            if(!name || !email || !password || !phoneNumber){
                return res.status(400).json({message:'All feailds are required'});
            }

            const {user} = await this.userservice.rigisteruser(name,email,password,phoneNumber)
            console.log('resoponce in controller',user)
            res.status(201).json({
                massage:'User Registerd sucessfully',
                user: user
            })
        }catch(error:any){
            res.status(400).json({message:error.message})
        }
    }

    // for  login 

    async loginUser(req:Request, res: Response){
        console.log("works")
        console.dir(req.headers,{depth:null},)
        try {
            const {email, password }= req.body
            const data = await this.userservice.loginUser(email, password)
            console.log("data willget from the login",data)
            res.status(200).json({success: true, message:"Login Sucessfully completed",data})

        } catch (error) {
            res.status(400).json({sucess:false, message:(error as Error).message})
        }
    }


    async updateProfilePicture(req: AuthRequest, res: Response): Promise<void> {
        try {
        console.log("update profile works")
          const userId = req.user?.userid; 
          const file = req.file; 
    
          if (!userId) {
            console.log('Unauthorized')
            res.status(401).json({ message: 'Unauthorized' });
            return;
          }
    
          if (!file) {
            console.log('No file uploaded')
            res.status(400).json({ message: 'No file uploaded' });
            return;
          }
    
          const updatedUser = await this.userservice.updateProfilePicture(userId, file);
          console.log("data in controller,",updatedUser)
          res.status(200).json({ profilePictureUrl:`http://localhost:3001/${updatedUser.profile}`, message: 'Profile picture updated successfully' });
        } catch (error: any) {
          res.status(400).json({ message: error.message });
        }
      }
}
