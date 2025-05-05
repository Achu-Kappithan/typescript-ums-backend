

import express  from "express";
import   { AdminConroller }  from "../controllers/AdminController";

const adminroute = express.Router()
const admincontroller = new AdminConroller()



adminroute.post('/login',admincontroller.loginAdmin.bind(admincontroller))
adminroute.get('/getAllUsers',admincontroller.getAllUsers.bind(admincontroller))



export default adminroute

