import mongoose from "mongoose"
import { Tweet } from "../../models/Tweet.js"
import { User } from "../../models/User.js"

export const showFeed = async (authenticatedUserId) => {
  const user = await User.findById(authenticatedUserId)
  if (!user) throw new Error("User does not exist")

  const userTweets = await Tweet.find({ userId: authenticatedUserId })
  const userFollowsIdArr = user.isFollowerOf // ! Array mit ID als Object IDs

  const userFollerIdStringsArr = userFollowsIdArr.map(
    (item) => item.toString() // ! Array mit ID als String IDs
  )

  const followerTweetsArr = await Tweet.find({ userId: { $in: userFollerIdStringsArr } })

  console.log({ userFollowsIdArr, followerTweetsArr, userFollerIdStringsArr })

  // # Fehlermeldung, wenn beide leer
  // # Sortieren
  // # [...userTweets, followerTweetsArr]

  //   return { userTweets, followerTweetsArr }
  return [...userTweets, ...followerTweetsArr]
}
