import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// AuthRoutes
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(cookieParser());

app.listen(PORT, () => {
  connectDB();
  console.log(`SERVER IS RUNNING IN ${PORT}`);
});
