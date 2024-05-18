import express from "express";
import { isAdminRoute,protectRoute } from "../middleware/authMiddleware.js";
import { registerUser } from "../controllers/userController.js";
const router =express.Router();


router.post('/register',registerUser);
// router.post('/login',loginUser);
// router.post('/logout',logoutUser);
export default router;