import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messagesRoutes from "./routes/message.route.js";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
// AuthRoutes

app.use("/api/auth", authRoutes);
app.use("/api/message", messagesRoutes);
// 쿠키파싱해주기

app.listen(PORT, () => {
  connectDB();
  console.log(`SERVER IS RUNNING IN ${PORT}`);
});
