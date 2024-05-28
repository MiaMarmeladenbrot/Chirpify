import { Comment } from "../../models/Comment.js";
import { Tweet } from "../../models/Tweet.js";

export async function showAllCommentsOfTweet(tweetId) {
  // wir suchen mit der tweedId in den comments
  // und zeigen alle comments, die die tweetId enthalten
  // comment-model
  // find({tweetId})

  const tweet = await Tweet.findById(tweetId);
  if (!tweet)
    throw new Error("This tweet does not exist and ergo has no comments.");

  const allComments = await Comment.find({ tweetId }).populate({
    path: "userId",
    select: "_id firstname lastname username profileImg",
  });

  return allComments;
}
