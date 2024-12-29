import express from "express";
import {
  isAlreadyAuthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendPasswordResetOtp,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/auth_controller.js";
import userAuth from "../middleware/user_auth.js";

const auth_router = express.Router();

auth_router.post("/register", register);
auth_router.post("/login", login);
auth_router.post("/logout", logout);
auth_router.post("/send-verify-otp", userAuth, sendVerifyOtp);
auth_router.post("/verify-account", userAuth, verifyEmail);
auth_router.get("/is-auth", userAuth, isAlreadyAuthenticated);
auth_router.post("/send-reset-otp", sendPasswordResetOtp);
auth_router.post("/reset-password", resetPassword);

export default auth_router;
