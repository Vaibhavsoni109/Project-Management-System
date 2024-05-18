import User from "../models/user.js";
import { createJWT } from "../utils/index.js";

export const registerUser =async(req,res)=>
    {
        try {
            const {name,email,password,isAdmin,role,title}=req.body;

            const userExist=await User.findOne({email});
            if(userExist)
                {
                    return res.status(400).json({message:"User already exist"})
                }
                const user=await User.create({
                    name,email,password,isAdmin,role,title
                });
                if(user)
                    {
                        isAdmin ? createJWT(res,user_id):null;
                        user.password=undefined;
                        res.status(200).json(user)
                    }
                    else{
                        res.status(400).json({message:"invaild user data"})
                    }
                
        } catch (error) {
            // console.log(error)
            return res.status(400).json({status:false,message:"invailed user data"});
        }
    }


    // export const registerUser =async(req,res)=>
    //     {
    //         try {
                
    //         } catch (error) {
    //             // console.log(error)
    //             return res.status(400).json({status:false,message:"invailed user data"});
    //         }
    //     }