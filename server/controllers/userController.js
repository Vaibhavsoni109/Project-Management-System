
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


    export const loginUser =async(req,res)=>
        {
            try {
                const {email,password}=req.body;
                const user=await User.findOne({email});
                if(!user)
                    {
                        res.status(401).json({status:false,message:"invailid user name"})
                    }
                   if(!user?.isActive)
                    {
                        return res.status(401).json({
                            status:false,
                            message:"user account has been deactivavte plz contact the administrator"
                        })
                    }

                    const isMatch=await user.matchPassword(password);
                    if(user && isMatch)
                        {
                            createJWT(res,user_id)
                            user.password=undefined;

                            res.status(200).json(user);
                        }
                        else{
                            return res.status(401).json({status:false, message:"invaild email or oassword"});
                        }
            } catch (error) {
                // console.log(error)
                return res.status(400).json({status:false,message:"invailed user data"});
            }
        }
        
    export const logoutUser =async(req,res)=>
        {
            try {
                res.cookie("token","",{
                    httpOnly:true,
                    expires:new Date(0)
                })
                res.status(200).json({status:true,message:"user logged out"})
            } catch (error) {
                // console.log(error)
                return res.status(400).json({status:false,message:"invailed user data"});
            }
        }

        // export const loginUser =async(req,res)=>
        //     {
        //         try {
                    
        //         } catch (error) {
        //             // console.log(error)
        //             return res.status(400).json({status:false,message:"invailed user data"});
        //         }
        //     }