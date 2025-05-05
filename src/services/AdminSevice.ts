import { AdminRepository } from "../repositry/AdminRepository";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/jwtHelper";


export class AdminService {
    adminrepository : AdminRepository

    constructor(){
        this.adminrepository = new AdminRepository()
    }

    async loginAdmin (email: string, password: string) {
        try {
            console.log("njn vannu")
            const user = await this.adminrepository.findByEmail(email);
            console.log("data get in service ",user)
            if (!user) throw new Error('Invalid Email or Password');
    
            if (!user.is_admin) throw new Error('Admin can only login');
    
            const isPassword = await bcrypt.compare(password, user.password);
            if (!isPassword) throw new Error('Invalid Email or Password');
    
            const jwtToken = await generateToken({
                userid: user._id,
                email: user.email,
                is_admin: user.is_admin
            });
    
            return { jwtToken };
        } catch (error) {
            console.log("Error in AdminService.loginAdmin", error);
            throw error;
        }
    }

    async getAllUsers(){
        try {
            console.log("getallusers working")  
            const users = await this.adminrepository.findAllUsers()

            return users
            
        } catch (error) {
            console.log("error from the get allusers in adminService ", error)
            throw error
        }
    }
}