import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//   console.log(decodedToken);
        const resp = await User.findById(decodedToken.userid).select(
          "isAdmin email"
        );
    //   console.log("Response from User.findById:", resp); // Log the resp object
      
    req.user = {
        email: resp.email,
        isAdmin: resp.isAdmin,
        userid: decodedToken.userid,
      };
    //   console.log("Response from User.findById:", req.user); // Log the resp object


      next();
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Not authorized. try login again." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ status: false, message: "Not authorized. Try login again." });
  }
};

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