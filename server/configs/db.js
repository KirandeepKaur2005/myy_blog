import mongoose from "mongoose";

const connectDB = async() => {
    try{
        mongoose.connection.on('connected', () => console.log("Database connected"))
        await mongoose.connect(`${process.env.MONGODB_URI}/myblog`)
    }
    catch(e) {
        console.log("Error while connecting db: " + e.message);
    }
}

export default connectDB;