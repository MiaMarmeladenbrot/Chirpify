import { loginUser } from "./userServices/loginUser.js";
import { registerUser } from "./userServices/registerUser.js";
import { sendVerifyEmail } from "./userServices/sendVerifyEmail.js";
import { verifyEmail } from "./userServices/verifyEmail.js";

export const UserService = {
  registerUser,
  loginUser,
  sendVerifyEmail,
  verifyEmail,
};
