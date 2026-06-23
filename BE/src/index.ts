import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./Routers/UserRoutes";
import cors from "cors";
import aiRoutes from "./Routers/AIRoute";
import noteRoutes from "./Routers/NoteRoute";
import messageRoutes from "./Routers/MessageRoute";
import adminRoutes from "./Routers/AdminRoutes";

dotenv.config();

const app = express();


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://study-link-jet.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
 
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("StudyLink Backend Running");
});

// DB CONNECT
mongoose
  .connect(process.env.DB_URL as string)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});