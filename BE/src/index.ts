import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import mongoDB from "./config/db";
import jwt from 'jsonwebtoken';
import userRoutes from './Routers/UserRoutes';
import aiRoutes from "./Routers/AIRoute";
import noteRoutes from "./Routers/NoteRoute";
import messageRoutes from "./Routers/MessageRoute";
import adminRoutes from "./Routers/AdminRoutes";

const app = express();
// const allowedOrigins = [
//   "https://study-link-jwxa.vercel.app",
//   process.env.CLIENT_URL,
// ].filter(Boolean) as string[];

app.use(
  cors({
    origin: "http://localhost:5173", // Allow all origins for now
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (_req, res) => {
  res.json({ success: true, message: "study-link API is running" });
});


mongoDB().catch((err) => console.error("Database connection failed:", err));

export default app;