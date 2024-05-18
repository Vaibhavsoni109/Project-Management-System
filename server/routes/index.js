import express from "express";
import userRoutes from "./userRoutes.js"
import taskRoutes from "./taskRoutes.js"

const router =express.Router()

taskRoutes.use('./user',userRoutes)
taskRoutes.use('./task',taskRoutes)

export default router;