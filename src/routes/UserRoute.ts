
import experss  from 'express'
import { userController } from '../controllers/userConteroller'
import { authenticateToken } from '../middleware/auth.middleware'  
import { upload } from '../config/multer.config'

const userrouter = experss.Router()
const controllers = new userController()


userrouter.post('/register', controllers.registerUser.bind(controllers) as experss.RequestHandler)
userrouter.post('/login',controllers.loginUser.bind(controllers))
userrouter.get('/test',authenticateToken,controllers.updateProfilePicture.bind(controllers))
userrouter.post('/profile-picture', authenticateToken, upload.single('profilePicture'), controllers.updateProfilePicture.bind(controllers));

export default userrouter