import mongoose from "mongoose";

const DB_URL = (process.env.DB_URL || process.env.MONGODB_URI) as string;

let cachedConnection: Promise<typeof mongoose> | null = null;

const mongoDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }
    if (cachedConnection) {
        return cachedConnection;
    }

    try {
        mongoose.set('bufferCommands', false);

        if (!DB_URL) {
            throw new Error("Database connection string (DB_URL) is undefined.");
        }

        console.log("Creating new MongoDB connection pool...");
        
        cachedConnection = mongoose.connect(DB_URL, {
            serverSelectionTimeoutMS: 5000,
        });

        await cachedConnection;
        console.log("MongoDB connected successfully");
        
        return mongoose.connection;
    } catch (error) {
        mongoDB();
        
        console.log("DB connection error:", error);
        cachedConnection = null;
        throw error;
    }
};

export default mongoDB;