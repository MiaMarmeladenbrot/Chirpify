import { Tweet } from "../../models/Tweet.js";

export async function editTweet(tweetId, updateTweetInfo) {
  // prüfen, ob tweet existiert
  // prüfen, ob message <= 160
  // message und retweetedTweedId prüfen
  // tweet updaten
  // return updated tweet

  const tweet = await Tweet.findById(tweetId);
  if (!tweet) throw new Error("Tweet not found.");

  if (updateTweetInfo.message && updateTweetInfo.message.length > 160)
    throw new Error("Tweets cannot exceed a length of 160 characters.");

  //   if (!updateTweetInfo.message && !updateTweetInfo.retweetedTweedId)
  //     throw new Error("Tweets need content - what do you wanna say?");

  //   # morgen noch mal fresh!
  //   if (
  //     updateTweetInfo.message &&
  //     updateTweetInfo.message.length === 0 &&
  //     updateTweetInfo.retweetedTweedId &&
  //     updateTweetInfo.retweetedTweedId.length === 0
  //   )
  //     throw new Error("Tweets need content - what do you wanna say?");

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: updateTweetInfo,
    },
    { new: true }
  );

  return { updatedTweet };
}
