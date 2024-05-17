import cookieParser from "cookie-parser";
import cors from "cors"
import  dotenv  from "dotenv";
import express from 'express'
import morgan  from "morgan";
import dbConnection from "./utils/index.js";
import { erroHandler, routeNotFound } from "./middleware/errorMiddleware.js";
const routes = " " ;

dotenv.config();


dbConnection();

const port=process.env.PORT || 5000;

const app=express();
app.use(cors({
    origin:['http://localhost:3000'],
    methods:["GET",'POST',"PUT","DELETE"],
    credentials:true
}))
app.use(express.json)
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(morgan("dev"))
// app.use('/api',routes);
app.use(routeNotFound);
app.use(erroHandler);
app.get('/',(req,res)=>
{
    res.send("hello")
})
app.listen(port,()=>

    console.log(`server listening on http://localhost:${port}`)

)
