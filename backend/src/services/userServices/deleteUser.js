import { User } from "../../models/User.js";
import { userToView } from "../../utils/userToView.js";

export const deleteUser = async (authenticatedUserId) => {
  // authenticatedUserId finden in Tweets.userId => Funktion deleteTweet(authenticatedUserId, tweetId)
  // authenticatedUserId finden in Comments.userId => Funktion deleteComments(authenticatedUserId, commentId)
  // authenticatedUserId finden in Tweets.isLikedBy => Funktion dislikeUsersTweet(authenticatedUserId, tweetId)
  // authenticatedUserId finden in User.isFollowerOf => Funktion unfollowUser(authenticatedUserId, userId)
  const user = await User.findByIdAndDelete(authenticatedUserId);
  return userToView(user);
};
