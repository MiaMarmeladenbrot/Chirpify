import { Tweet } from "../../models/Tweet.js";

export async function editTweet(tweetId, updateTweetInfo) {
  // prüfen, ob tweet existiert
  // prüfen, ob message <= 160
  // message und retweetedTweetId prüfen => Längen bzw. existiert retweetedTweetId?
  // tweet updaten
  // return updated tweet

  const tweet = await Tweet.findById(tweetId);
  if (!tweet) throw new Error("Tweet not found.");

  if (updateTweetInfo.message && updateTweetInfo.message.length > 160)
    throw new Error("Tweets cannot exceed a length of 160 characters.");

  //   if (!updateTweetInfo.message && !updateTweetInfo.retweetedTweetId)
  //     throw new Error("Tweets need content - what do you wanna say?");

  //   # morgen noch mal fresh!
  //   if (
  //     updateTweetInfo.message &&
  //     updateTweetInfo.message.length === 0 &&
  //     updateTweetInfo.retweetedTweetId &&
  //     updateTweetInfo.retweetedTweetId.length === 0
  //   )
  //     throw new Error("Tweets need content - what do you wanna say?");

  // wir wollen verhindern, dass User den Content seines Tweets leeren kann, also das Folgendes passiert:
  //    "message": "",
  //    "retweetedTweetId": null,

  if (updateTweetInfo.message && updateTweetInfo.message.length === 0)
    throw new Error("Tweets need content - what do you wanna say?"); //--> warum wird "" nicht als 0 gezählt? mit === 1 funktioniert die Abfrage ...

  if (
    updateTweetInfo.retweetedTweetId &&
    updateTweetInfo.retweetedTweetId.length === 0
    // außerdem: existiert dieser Tweet überhaupt?
  )
    throw new Error("Tweets need content - what do you wanna say?"); // --> bekommt eh error: "Cast to ObjectId failed for value \"\" (type string) at path \"retweetedTweetId\" because of \"BSONError\""

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: updateTweetInfo,
    },
    { new: true }
  );

  return { updatedTweet };
}
