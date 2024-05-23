import { Tweet } from "../../models/Tweet.js";

export async function editTweet(authenticatedUserId, tweetId, updateTweetInfo) {
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) throw new Error("Tweet not found.");

  const useridString = tweet.userId.toString();
  if (authenticatedUserId !== useridString)
    throw new Error("You are not authorized to edit this tweet.");

  // falls eine message geändert werden soll, darf sie nur max 160 Zeichen lang sein
  if (updateTweetInfo.message?.length > 160)
    throw new Error("Tweets cannot exceed a length of 160 characters.");

  // falls eine message geändert werden soll, darf sie nicht leer sein
  if (updateTweetInfo.message?.length < 1)
    throw new Error("Tweets need content - what do you wanna say?");

  // falls man retweetTweetId bearbeiten kann, brauchen wir abfragen - wollen wir im Frontend aber einfach nicht zulassen
  // // falls eine Referenz zu einem anderen Tweet (retweet) hinzugefügt werden soll, darf das nicht leer sein
  // if (
  //   updateTweetInfo.retweetedTweetId?.length < 1
  //   // außerdem: existiert dieser Tweet überhaupt?
  // )
  //   throw new Error("Tweets need content - what do you wanna say?"); // --> bekommt eh error: "Cast to ObjectId failed for value \"\" (type string) at path \"retweetedTweetId\" because of \"BSONError\""

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: updateTweetInfo,
    },
    { new: true }
  );

  return { updatedTweet };
}
