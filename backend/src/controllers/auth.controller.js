import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const userData = req.body;
    const { email, fullName, password } = userData;
    //
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "The password must be over 6 letters",
      });
    }
    if (!email || !fullName || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill up the all form" });
    }
    const existedUser = await User.findOne({ email: email });
    if (existedUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Create New User
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: email,
      fullName: fullName,
      password: hashPassword,
    });
    if (newUser) {
      return res
        .status(201)
        .json({ success: true, message: "Created New User", newUser: newUser });
    } else {
      return res.json(400).json({ success: false, message: "INVALID USER" });
    }
  } catch (error) {
    console.error("Error in creating User❗️");
    return res.status(500).json({
      success: false,
      message: "Fail in creating new User" + error.message,
    });
  }
};

export const login = (req, res) => {
  return res.send({ message: "Signup Route" });
};

export const logout = (req, res) => {
  return res.send({ message: "Signup Route" });
};
