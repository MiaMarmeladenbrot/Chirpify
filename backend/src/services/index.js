import { addTweet } from "./tweetServices/addTweet.js";
import { editTweet } from "./tweetServices/editTweet.js";
import { showOneUser } from "./userServices/ShowOneUser.js";
import { deleteUser } from "./userServices/deleteUser.js";
import { editUser } from "./userServices/editUser.js";
import { loginUser } from "./userServices/loginUser.js";
import { registerUser } from "./userServices/registerUser.js";
import { sendVerifyEmail } from "./userServices/sendVerifyEmail.js";
import { showAllUsers } from "./userServices/showAllUsers.js";
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
};

export const TweetService = {
  addTweet,
  editTweet,
};
