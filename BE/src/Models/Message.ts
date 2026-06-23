import mongoose from "mongoose";

// "dev": "ts-node-dev --respawn src/index.ts",

const messageSchema = new mongoose.Schema(
  {
    conversationId: { type: String, required: true },

    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    message: { type: String, required: true },

    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);