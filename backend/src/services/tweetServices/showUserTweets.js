import { Tweet } from "../../models/Tweet.js"
import { User } from "../../models/User.js"

export const showUserTweets = async (userId) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User does not exist")

  const allUserTweets = await Tweet.find({ userId })
  return allUserTweets
}
