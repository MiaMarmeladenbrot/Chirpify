import { loginUser } from "./userServices/loginUser.js";
import { registerUser } from "./userServices/registerUser.js";
import { sendVerifyEmail } from "./userServices/sendVerifyEmail.js";

export const UserService = {
  registerUser,
  loginUser,
  sendVerifyEmail,
};
