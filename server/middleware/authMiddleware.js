import jwt from "jsonwebtoken"
import user from "../models/user.js"
const protectRoute = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (token) {
            const decodetoken = jwt.verify(token, process.env.JWT_SECRET);
            const resp = await User.findById(decodetoken.userId).select('isAdmin email')
            req.user = {
                email: resp.email,
                isAdmin: resp.isAdmin,
                userId: decodetoken.userId,
            }
        }
        else
        {
            return status(401).json({status:false,message:"not authorizes try agin later"})
        }

    } catch (error) {
        console.log(error)
        return res.status(401).json({ status: false, message: "not authorized .try Login Again" })
    }
}
const isAdminRoute = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(401).json({
            status: false,
            message: "Not authorized as admin. Try login as admin.",
        });
    }
};

export { isAdminRoute, protectRoute };