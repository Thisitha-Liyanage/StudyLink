import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    title: { type: String, required: true },
    content: { type: String, required: true },

    images: { type: [String], default: [] },
    files: { type: [String], default: [] },

    tags: { type: [String], default: [] },

    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },

    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);