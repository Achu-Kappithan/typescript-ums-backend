import { Request, Response } from "express";
import { userService } from "../services/UserService";


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
        try {
            const {email, password }= req.body
            const data = await this.userservice.loginUser(email, password)
            console.log("data willget from the login",data)
            res.status(200).json({success: true, message:"Login Sucessfully completed",data})

        } catch (error) {
            res.status(400).json({sucess:false, message:(error as Error).message})
        }
    }
}
