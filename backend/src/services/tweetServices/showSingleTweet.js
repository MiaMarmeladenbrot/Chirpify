import { Tweet } from "../../models/Tweet.js";
import { User } from "../../models/User.js";

export const showSingleTweet = async (authenticatedUserId, tweetId) => {
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("User does not exist");

  // alle tweets des authentifizierten Users
  const singleTweet = await Tweet.findById(tweetId)
    .populate({
      path: "userId",
      select: "_id firstname lastname username profileImg",
    })
    .populate({
      path: "retweetedTweetId",
      select: "_id userId message createdAt",
      populate: {
        path: "userId",
        select: "_id firstname lastname username profileImg",
      },
    });

  if (!singleTweet)
    throw new Error("Tweet with the id " + tweetId + " does not exist");

  return singleTweet;
};
