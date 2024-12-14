import { generateToken } from "../lib/utils.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
export const signup = async (req, res) => {
  try {
    // 클라이언트에서 서버로 보내줌 req
    const userData = req.body;
    const { email, fullName, password } = userData;

    if (password?.length < 6) {
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
      // generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        newUser,
      });
    } else {
      return res.json(400).json({ success: false, message: "INVALID USER" });
    }
  } catch (error) {
    console.error("Error in creating User❗️", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal ERROR IN CREATING NEW USERr" + error.message,
    });
  }
};

export const login = async (req, res) => {
  // 사용자가 input에 넣은값을 먼저 받아오기
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid User" });
    }
    // 뒤에 나온게 Hashpasswoed(DB에 저장되어있는거)
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Password doesn't match" });
    }
    generateToken(user._id, res);
    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.error("FAILED TO LOGIN");
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    // Cookie 지워주기
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("ERROR IN LOGGOUT Controller", error.message);
    return res.status(500).json({ message: "Internal ERROR" });
  }
};
// When user wants to update the image
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }
    // we need to update the picure in database
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch (error) {
    console.log("ERROR in update profile", error.message);
    res
      .status(500)
      .json({ message: "INTERNAL ERROR IN UPDATING PROFILE" + error.message });
  }
};

export const checkAuth = (req, res) => {
  try {
    // 서버에 저장되어있는는 User의 정보를 보여주면됨
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller.", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
