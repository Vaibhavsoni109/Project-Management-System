import mongoose, { mongo }  from "mongoose";

const dbConnection=async()=>
    {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("connected succefully")
        } catch (error) {
            console.log("db Error"+error)
        }
    }
export default dbConnection;