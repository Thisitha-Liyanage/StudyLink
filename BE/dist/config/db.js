"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DB_URL = process.env.DB_URL;
const mongoDB = async () => {
    try {
        await mongoose_1.default.connect(DB_URL);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.log("DB connection error:", error);
        process.exit(1);
    }
};
exports.default = mongoDB;
