
import experss  from 'express'
import { userController } from '../controllers/userConteroller' 

const userrouter = experss.Router()
const controllers = new userController()


userrouter.post('/register', controllers.registerUser.bind(controllers) as experss.RequestHandler)
userrouter.post('/login',controllers.loginUser.bind(controllers))

export default userrouter