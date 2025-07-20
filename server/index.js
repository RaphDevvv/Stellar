import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import helmet from "helmet"
import connectDb from "./config/dbconnect.js"
import postRouter from "./route/post.router.js"
import userRouter from "./route/user.router.js"
import imageRouter from "./route/image.router.js"
import notificationRouter from "./route/notification.router.js"


dotenv.config()

const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginOpenerPolicy : false
}))

app.get("/",(req,res)=>{
    res.json("zjdsado")
})

app.use("/api/posts",postRouter)
app.use("/api/user",userRouter)
app.use("/api/image",imageRouter)
app.use("/api/notification",notificationRouter)

connectDb()

const PORT = 8080

app.listen(PORT, ()=>{
    console.log("yeah")
})

