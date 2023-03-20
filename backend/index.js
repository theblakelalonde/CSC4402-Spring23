import express from "express"
import mysql from "mysql"

const app = express();

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js";
import cors from "cors"
import cookieParser from "cookie-parser";

//middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/backend/auth", authRoutes)
app.use("/backend/users", userRoutes)
app.use("/backend/posts", postRoutes)
app.use("/backend/comments", commentRoutes)
app.use("/backend/likes", likeRoutes)



app.listen(8800, () => {
    console.log("Connected to backend!")
})