import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

// Method 과 Purpose 목적 맞추기
// auth 필요한건 미리 protect해주기
router.put("/update-profile", protectRoute, updateProfile);
// ??
router.get("/check", protectRoute, checkAuth);

export default router;
