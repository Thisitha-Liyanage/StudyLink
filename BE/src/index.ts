import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import mongoDB from "./config/db";
import jwt from 'jsonwebtoken';
import { createServer } from 'http';
import userRoutes from './Routers/UserRoutes';
import aiRoutes from "./Routers/AIRoute";
import noteRoutes from "./Routers/NoteRoute";
import messageRoutes from "./Routers/MessageRoute";
import adminRoutes from "./Routers/AdminRoutes";

const PORT = process.env.PORT || 5000;

const app = express();
const allowedOrigins = [
  "https://freelancefluxo-web.vercel.app",
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: allowedOrigins,
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

app.get("/api/v1/health", (_req, res) => {
  res.json({ success: true, message: "Freelance-Fluxo API is running" });
});

 
const start = async () => {
  await mongoDB();

  const server = createServer(app);

  server.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
  });
};

start();