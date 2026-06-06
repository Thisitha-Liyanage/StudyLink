import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    type: {
      type: String,
      enum: ["like", "comment", "message", "follow"],
      required: true,
    },

    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    messageId: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },

    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);