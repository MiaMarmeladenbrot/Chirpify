import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    tweetId: { type: mongoose.Types.ObjectId, ref: "Tweet", required: true },
    message: { type: String, required: true, trim: true },
    taggedUsers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { collection: "comments", timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
