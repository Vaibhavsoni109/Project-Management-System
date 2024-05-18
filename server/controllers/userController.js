
import User from "../models/user.js";
import Notice from "../models/notification .js";
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
                return res.status(400).json({status:false,message:error.message});
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
                return res.status(400).json({status:false,message:error.message});
            }
        }

        export const getTeamList =async(req,res)=>
            {
                try {
                    const users=await User.find().select("name title email isActive ");
                    res.status(200).json(users);
                } catch (error) {
                    // console.log(error)
                    return res.status(400).json({status:false,message:error.message});
                }
            }


        export const getNotificationsList =async(req,res)=>
            {
                try {
                    
                    const {userId}=req.user;
                    const notice=await Notice.findOne({
                        team:userId,
                        isRead:{$nin:[userId]},

                    }).populate('task',"title");

                    res.status(201).json(notice);
                } catch (error) {
                    // console.log(error)
                    return res.status(400).json({status:false,message:error.message});
                }
            }

        
        export const updateUserProfile =async(req,res)=>
            {
                try {
                    const {userid,isAdmin}=req.user;
                    const {_id}=req.body;

                    const id=isAdmin && userid=== _id ?userid: isAdmin && userId === _id?_id:userId ;

                    const user=await User.findById(id)
                    if(user)
                        {
                            user.name=req.body.name ||user.name;
                            user.title=req.body.title ||user.title;
                            user.role=req.body.role ||user.role;
                            
                            const userUpdate=await User.Save();

                            user.password=undefined;
                            res.status(201).json({
                                status:true,
                                message:"User Profile Updated Successfully",
                                user:userUpdate,
                            })

                            
                        }
                        else{
                            res.status(404).json({status:false,message:"user not found"});
                        }

                    
                } catch (error) {
                    // console.log(error)
                    return res.status(400).json({status:false,message:error.message});
                }
            }
        export const markNotificationRead =async(req,res)=>
            {
                try {
                    const{userId}=req.user;
                    const {isReadType, id}=req.query;
                    if(isReadType=='all'){
                        await Notice.updateMany(
                            {team:userId,isRead:{$nin:[userId]}},
                        { $push :{isRead:userId} },
                        {new:true}
                       )
                    }
                    else {
                        await Notice.findOneAndUpdate(
                          { _id: id, isRead: { $nin: [userId] } },
                          { $push: { isRead: userId } },
                          { new: true }
                        );
                      }
                      res.status(201).json({ status: true, message: "Done" });

                    
                } catch (error) {
                    // console.log(error)
                    return res.status(400).json({status:false,message:error.message});
                }
            }

           // export const loginUser =async(req,res)=>
        //     {
        //         try {
                    
        //         } catch (error) {
        //             // console.log(error)
        //             return res.status(400).json({status:false,message:error.message});
        //         }
        //     }