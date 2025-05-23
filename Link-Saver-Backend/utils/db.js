
import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');
    }  
    catch(error){//If there is error
        console.log("Db not connected");
        console.log(error);
    }
}

export default connectDB;