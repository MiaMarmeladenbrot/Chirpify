import { Tweet } from "../../models/Tweet.js"

export async function addTweet(
  authenticatedUserId,
  { userId, message, retweetedTweetId, isLikedBy }
) {
  // {
  //     userId: { type: mongoose.Types.ObjectId, ref: "User", required: true }, -> authenticatedUserId aus Authorization
  //     message: { type: String, trim: true },
  //     retweetedTweetId: { type: mongoose.Types.ObjectId, ref: "Tweet" }, // im Post-Tweet-Service: entweder retweet oder message muss befüllt sein, dürfen nicht beide leer sein
  //     isLikedBy: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  //   },
  // Abfrage: Länge von tweetInfo.message < 160
  // Abfrage: entweder message oder retweetedTweetId oder beide vorhanden? bzw. eines muss
  // create(tweetInfo)
  // return neuen tweet

  const useridString = userId.toString()
  if (authenticatedUserId !== useridString)
    throw new Error("You are not authorized to post this tweet.")

  if (message.length > 160) throw new Error("Tweets cannot exceed a length of 160 characters.")

  if (!message && !retweetedTweetId) throw new Error("Tweets need content - what do you wanna say?")

  const newTweet = await Tweet.create({
    userId: authenticatedUserId,
    message,
    retweetedTweetId,
    isLikedBy,
  })

  return { newTweet }
}
