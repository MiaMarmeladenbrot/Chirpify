import { Tweet } from "../../models/Tweet.js";

export async function addTweet(
  authenticatedUserId,
  { message, retweetedTweetId, isLikedBy }
) {
  if (message.length > 160)
    throw new Error("Tweets cannot exceed a length of 160 characters.");

  if (!message && !retweetedTweetId)
    throw new Error("Tweets need content - what do you wanna say?");

  const newTweet = await Tweet.create({
    userId: authenticatedUserId,
    message,
    retweetedTweetId,
    isLikedBy,
  });

  return { newTweet };
}
