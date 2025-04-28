import mongoose from "mongoose";

const mongoDB = async()=>{
    try{
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/fullstack_ums'
        await mongoose.connect(mongoURI)
        console.log('DB connected')
    } catch (err) {
        console.error("Error for connecting D.B ",err)
    }
}

export default mongoDB;