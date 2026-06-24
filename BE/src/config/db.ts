import mongoose from "mongoose";

const DB_URL = (process.env.DB_URL || process.env.MONGODB_URI) as string;

const mongoDB = async () => {
    // If already connected or connecting, do not open a new connection
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        // Disable buffering so it immediately alerts you if something is disconnected
        mongoose.set('bufferCommands', false);

        if (!DB_URL) {
            throw new Error("Database connection string (DB_URL) is undefined. Check Vercel Env Variables.");
        }

        await mongoose.connect(DB_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("DB connection error:", error);
    }
};

export default mongoDB;