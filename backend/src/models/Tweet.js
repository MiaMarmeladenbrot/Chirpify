import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    message: { type: String, trim: true },
    retweetedTweedId: { type: mongoose.Types.ObjectId, ref: "Tweet" }, // im Post-Tweet-Service: entweder retweet oder message muss befüllt sein, dürfen nicht beide leer sein
    isLikedBy: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { collection: "tweets", timestamps: true }
);

export const Tweet = mongoose.model("Tweet", tweetSchema);
