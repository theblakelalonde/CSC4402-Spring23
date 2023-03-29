import express from "express";
import mysql from "mysql";

const app = express();

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import suggestionRoutes from "./routes/suggestions.js";
import searchRoutes from "./routes/searches.js";
import checkedInRoutes from "./routes/checkedIns.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now());
  },
});

const upload = multer({ storage: storage });

app.post("/backend/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use(cookieParser());

app.use("/backend/auth", authRoutes);
app.use("/backend/users", userRoutes);
app.use("/backend/posts", postRoutes);
app.use("/backend/comments", commentRoutes);
app.use("/backend/suggestions", suggestionRoutes);
app.use("/backend/likes", likeRoutes);
app.use("/backend/checkedIn", checkedInRoutes);
app.use("/backend/searches", searchRoutes);

app.listen(8800, () => {
  console.log("Connected to backend!");
});
