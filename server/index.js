import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import dbConnection from "./utils/index.js";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js"; // Ensure correct import
import Userroutes from "./routes/userRoutes.js";
import Taskroutes from "./routes/taskRoutes.js";

dotenv.config();

dbConnection();

const port = process.env.PORT || 5000; // Added fallback port

const app = express();

app.use(cors({
    origin: ['http://localhost:3000',"https://project-management-system-rosy.vercel.app/",'https://project-management-system-git-master-vaibhavsoni109s-projects.vercel.app/'],
    methods: ["GET", 'POST', "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json()); // Added parentheses
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use('/api/user',Userroutes);
app.use('/api/task',Taskroutes);

app.use(routeNotFound); // Order matters: This should be after routes?
app.use(errorHandler);  // Order matters: This should be the last middleware

app.get('/', (req, res) => {
    res.send("hello");
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
