import mongoose from "mongoose"
import { Tweet } from "../../models/Tweet.js"
import { User } from "../../models/User.js"

export const showFeed = async (authenticatedUserId) => {
  const user = await User.findById(authenticatedUserId)
  if (!user) throw new Error("User does not exist")

  const userTweets = await Tweet.find({ userId: authenticatedUserId })
  const userFollowsIdArr = user.isFollowerOf

  const userFollerIdStringsArr = userFollowsIdArr.map((item) => item.toString())

  const followerTweetsArr = await Tweet.find({ userId: { $in: userFollerIdStringsArr } })

  const unsortedUserFeedArr = [...userTweets, ...followerTweetsArr]

  if (unsortedUserFeedArr.length === 0) throw new Error("Nothing to show yet")

  const sortedUserFeedArr = unsortedUserFeedArr.sort((a, b) => b.createdAt - a.createdAt)

  return sortedUserFeedArr
}
