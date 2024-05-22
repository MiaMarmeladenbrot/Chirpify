import { Tweet } from "../../models/Tweet.js";

export async function addTweet(
  authenticatedUserId,
  { message, retweetedTweedId, isLikedBy }
) {
  // {
  //     userId: { type: mongoose.Types.ObjectId, ref: "User", required: true }, -> authenticatedUserId aus Authorization
  //     message: { type: String, trim: true },
  //     retweetedTweedId: { type: mongoose.Types.ObjectId, ref: "Tweet" }, // im Post-Tweet-Service: entweder retweet oder message muss befüllt sein, dürfen nicht beide leer sein
  //     isLikedBy: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  //   },
  // Abfrage: Länge von tweetInfo.message < 160
  // Abfrage: entweder message oder retweetedTweedId oder beide vorhanden? bzw. eines muss
  // create(tweetInfo)
  // return neuen tweet

  if (message.length > 160)
    throw new Error("Tweets cannot exceed a length of 160 characters.");

  if (!message && !retweetedTweedId)
    throw new Error("Tweets need content - what do you wanna say?");

  const newTweet = await Tweet.create({
    userId: authenticatedUserId,
    message,
    retweetedTweedId,
    isLikedBy,
  });

  return { newTweet };
}
