import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./Routers/UserRoutes";
import cors from "cors";

dotenv.config(); // MUST be first

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);


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