import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// NEXT 로 auth 하고 넘기기
export const protectRoute = async (req, res, next) => {
  try {
    // 클라이언트에서 서버로 token을 보내줌
    const token = req.cookies.jwt;
    // 토큰이 없는경우
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }
    // Decoded 된 USer
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 유저 찾아서 내보내주기
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized- Invalid Token" });
    }
    // 클라이언트에는 password 숨겨서 보내기
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "FAILED TO FIND THE USER" });
    }
    // 클라이언트에서 서버로 보내줌
    req.user = user;
    next();
  } catch (error) {
    console.log("ERROR IN ProtectRoute middlewares: ", error.message);
    return res.status(500).json({ success: false, message: "SERVER ERROR" });
  }
};
