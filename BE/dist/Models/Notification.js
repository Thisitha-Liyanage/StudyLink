"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notificationSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    senderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    type: {
        type: String,
        enum: ["like", "comment", "message", "follow"],
        required: true,
    },
    postId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Post" },
    messageId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Message" },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Notification", notificationSchema);
