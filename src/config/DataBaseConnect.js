import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dataBaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is connected successfully");
    } catch (error) {
        console.log(error)
    }
}


export default dataBaseConnection;