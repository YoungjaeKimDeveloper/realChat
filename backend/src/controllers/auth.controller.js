import { User } from "../models/user.model";

export const signup = async (req, res) => {
  try {
    const userData = req.body;
    const { email, fullName, password } = userData;
    if (!email || !fullName || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill up the all forms" });
    }
    const newUser = await User.create(data);
    return res.status(200).json({ success: true, message: "Created New User" });
  } catch (error) {}
};

export const login = (req, res) => {
  return res.send({ message: "Signup Route" });
};

export const logout = (req, res) => {
  return res.send({ message: "Signup Route" });
};
