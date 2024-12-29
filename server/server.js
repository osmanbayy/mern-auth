import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/mongodb.js";
import auth_router from "./routes/auth_routes.js";
import user_router from "./routes/user_routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

connectToDatabase();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// API Endpoints
app.use("/api/auth", auth_router);
app.use("/api/user", user_router);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port.`);
});
