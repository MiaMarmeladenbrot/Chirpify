import { Tweet } from "../../models/Tweet.js";

export async function deleteTweet(authenticatedUserId, tweetId) {
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) throw new Error("Tweet not found.");

  const useridString = tweet.userId.toString();

  if (authenticatedUserId !== useridString)
    throw new Error("You are not authorized to delete this tweet.");

  await Tweet.updateMany(
    { retweetedTweetId: tweetId },
    { $set: { retweetedTweetId: null } },
    { new: true }
  );

  const deletedTweet = await Tweet.findByIdAndDelete(tweetId);
  return { deletedTweet };
}
