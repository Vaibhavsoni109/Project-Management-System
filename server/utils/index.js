import mongoose, { mongo }  from "mongoose";
import jwt from "jsonwebtoken";

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

export const createJWT =(res,userid)=>
    {
        const token=jwt.sign({userid},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.cookie("token",token,
            {
                httpOnly:true,
                secure:process.env.NODE_ENV==="developement",
                sameSite:"none", // prevent CSRF attack
                maxAge:1*24*60*60*1000, //1 day

            }
        )
    }