import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); // MUST be first

const app = express();

app.use(express.json());

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