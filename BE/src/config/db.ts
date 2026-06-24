import mongoose from "mongoose";

const DB_URL = (process.env.DB_URL || process.env.MONGODB_URI) as string;

// Cache the connection promise globally across serverless invocations
let cachedConnection: Promise<typeof mongoose> | null = null;

const mongoDB = async () => {
    // 1. If already fully connected, return immediately
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    // 2. If a connection is already in progress, wait for THAT exact same promise
    if (cachedConnection) {
        return cachedConnection;
    }

    try {
        mongoose.set('bufferCommands', false);

        if (!DB_URL) {
            throw new Error("Database connection string (DB_URL) is undefined.");
        }

        console.log("Creating new MongoDB connection pool...");
        
        // 3. Store the connection promise so concurrent requests share it
        cachedConnection = mongoose.connect(DB_URL, {
            serverSelectionTimeoutMS: 5000,
        });

        await cachedConnection;
        console.log("MongoDB connected successfully");
        
        return mongoose.connection;
    } catch (error) {
        console.log("DB connection error:", error);
        cachedConnection = null; // Reset cache on failure so it can retry next time
        throw error;
    }
};

export default mongoDB;