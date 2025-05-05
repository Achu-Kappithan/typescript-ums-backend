import { AdminService } from "../services/AdminSevice";
import { Request, Response } from "express";


export class AdminConroller {

    adminservices :AdminService

    constructor(){
        this.adminservices = new AdminService()
    }

    async loginAdmin (req:Request,res:Response){
        console.log("controller working")
        try {
            const {email, password} = req.body
            const data = await this.adminservices.loginAdmin(email,password)
            console.log("responce from db in controller",data)
            res.status(200).json({success: true, message:"Login Sucessfully completed",data})
        } catch (error) {
            console.log("errro while fetching the user",error)
            res.status(400).json({sucess:false, message:(error as Error).message})
        }

    }

    async getAllUsers(req: Request, res: Response){
        console.log("get all users in adamin controller working")
        try {
            const users = await this.adminservices.getAllUsers()
            res.status(200).json({sucess: true, message:"Loading users....",users})
            
        } catch (error) {
            console.log("error from adimn controller getall users",error)
            res.status(400).json({error})
        }

    }
}