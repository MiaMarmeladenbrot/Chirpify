import mongoose from "mongoose"
import { Tweet } from "../../models/Tweet.js"

export const likeUsersTweet = async (authenticatedUserId, tweetId) => {
  const foundTweet = await Tweet.findById(tweetId)

  //   console.log(foundTweet)
  if (!foundTweet) throw new Error("Tweet does not exist")

  const userIdToString = mongoose.Types.ObjectId.createFromHexString(authenticatedUserId)

  console.log(userIdToString)

  if (foundTweet.isLikedBy.includes(userIdToString)) throw new Error("You already liked this")

  const updatedTweet = await Tweet.findOneAndUpdate(
    { _id: tweetId },
    {
      $addToSet: { isLikedBy: authenticatedUserId },
    },
    { new: true }
  )

  return updatedTweet
}
