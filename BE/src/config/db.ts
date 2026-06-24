import mongoose from "mongoose"

// Check both DB_URL and MONGODB_URI to be completely safe
const DB_URL = (process.env.DB_URL || process.env.MONGODB_URI) as string

const mongoDB = async () => {
    // If already connected, reuse the active connection (Crucial for Vercel Serverless)
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        // Disable buffering so it fails fast if connection credentials are wrong
        mongoose.set('bufferCommands', false);

        if (!DB_URL) {
            throw new Error("Database connection string (DB_URL) is undefined. Check your Vercel Environment Variables.");
        }

        await mongoose.connect(DB_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("DB connection error:", error);
        // Do not use process.exit(1) on Vercel as it can kill the serverless container instance entirely
    }
}

export default mongoDB;