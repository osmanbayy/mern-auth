import express from "express";
import userAuth from "../middleware/user_auth.js";
import { getUserData } from "../controllers/user_controller.js";

const user_router = express.Router();

user_router.get("/data", userAuth, getUserData);

export default user_router;