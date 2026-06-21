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
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

// DB CONNECT
mongoose
  .connect(process.env.DB_URL as string)
  .then(() => {
    console.log("MongoDB Connected");

    // start server ONLY after DB connects
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

app.get("/", (req, res) => {
  res.send("StudyLink Backend Running");
});