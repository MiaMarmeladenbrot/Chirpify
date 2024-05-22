import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    message: {
      type: String,
      trim: true,
      maxLength: [160, "Tweets cannot exceed a length of 160 characters."],
    },
    retweetedTweetId: {
      type: mongoose.Types.ObjectId,
      ref: "Tweet",
      default: null,
    },
    isLikedBy: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { collection: "tweets", timestamps: true }
);

export const Tweet = mongoose.model("Tweet", tweetSchema);
