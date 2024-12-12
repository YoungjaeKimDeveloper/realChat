import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messagesRoutes from "./routes/message.route.js";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
// 프론트엔드에서 신호 받을수있게
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);
// AuthRoutes

app.use("/api/auth", authRoutes);
app.use("/api/message", messagesRoutes);
// 쿠키파싱해주기

app.listen(PORT, () => {
  connectDB();
  console.log(`SERVER IS RUNNING IN ${PORT}`);
});
