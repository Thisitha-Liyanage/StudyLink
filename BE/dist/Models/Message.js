"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// "dev": "ts-node-dev --respawn src/index.ts",
// "typescript": "^6.0.3"
const messageSchema = new mongoose_1.default.Schema({
    conversationId: { type: String, required: true },
    senderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    seen: { type: Boolean, default: false },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Message", messageSchema);
