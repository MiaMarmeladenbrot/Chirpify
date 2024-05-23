import mongoose from "mongoose";
import { Tweet } from "../../models/Tweet.js";

export const dislikeUsersTweet = async (authenticatedUserId, tweetId) => {
  const foundTweet = await Tweet.findById(tweetId);
  if (!foundTweet) throw new Error("Tweet does not exist");

  const userIdToString =
    mongoose.Types.ObjectId.createFromHexString(authenticatedUserId);

  if (!foundTweet.isLikedBy.includes(userIdToString))
    throw new Error("You never liked this");

  const updatedTweet = await Tweet.findOneAndUpdate(
    { _id: tweetId },
    {
      $pull: { isLikedBy: authenticatedUserId },
    },
    { new: true }
  );

  return updatedTweet;
};
