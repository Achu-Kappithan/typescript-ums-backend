import  express  from "express";
import  dotenv  from 'dotenv';
import cors from 'cors'
import connectDB from '../src/config/db'  
import userrouter from "./routes/UserRoute";

dotenv.config()
const app = express()
const port = process.env.PORT

connectDB()
app.use(cors())
app.use(express.json())
app.use('/user',userrouter)

app.listen(port, ()=> console.log(`http://localhost:${port}`))