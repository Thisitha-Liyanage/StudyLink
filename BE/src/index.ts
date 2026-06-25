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

// Set up CORS
app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (_req, res) => {
  res.json({ success: true, message: "study-link API is running" });
  console.log("study-link API is running");
});

// 1. Connect to the Database
mongoDB().catch((err) => console.error("Database connection failed:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running locally on http://localhost:${PORT}`);
});

export default app;