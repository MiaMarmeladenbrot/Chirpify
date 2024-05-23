import { addComment } from "./commentServices/addComment.js";
import { deleteComment } from "./commentServices/deleteComment.js";
import { editComment } from "./commentServices/editComment.js";
import { showAllCommentsOfTweet } from "./commentServices/showAllCommentsOfTweet.js";
import { addTweet } from "./tweetServices/addTweet.js";
import { deleteTweet } from "./tweetServices/deleteTweet.js";
import { dislikeUsersTweet } from "./tweetServices/dislikeUsersTweet.js";
import { editTweet } from "./tweetServices/editTweet.js";
import { likeUsersTweet } from "./tweetServices/likeUsersTweet.js";
import { showFeed } from "./tweetServices/showFeed.js";
import { showUserTweets } from "./tweetServices/showUserTweets.js";
import { showOneUser } from "./userServices/ShowOneUser.js";
import { deleteUser } from "./userServices/deleteUser.js";
import { editUser } from "./userServices/editUser.js";
import { followUser } from "./userServices/followUser.js";
import { loginUser } from "./userServices/loginUser.js";
import { registerUser } from "./userServices/registerUser.js";
import { sendVerifyEmail } from "./userServices/sendVerifyEmail.js";
import { showAllUsers } from "./userServices/showAllUsers.js";
import { unfollowUser } from "./userServices/unfollowUser.js";
import { verifyEmail } from "./userServices/verifyEmail.js";

export const UserService = {
  registerUser,
  loginUser,
  sendVerifyEmail,
  verifyEmail,
  editUser,
  deleteUser,
  showOneUser,
  showAllUsers,
  followUser,
  unfollowUser,
};

export const TweetService = {
  addTweet,
  editTweet,
  deleteTweet,
  showUserTweets,
  likeUsersTweet,
  dislikeUsersTweet,
  showFeed,
};

export const CommentService = {
  addComment,
  editComment,
  deleteComment,
  showAllCommentsOfTweet,
};
