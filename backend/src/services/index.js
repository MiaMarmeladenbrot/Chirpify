import { deleteUser } from "./userServices/deleteUser.js"
import { editUser } from "./userServices/editUser.js"
import { loginUser } from "./userServices/loginUser.js"
import { registerUser } from "./userServices/registerUser.js"
import { sendVerifyEmail } from "./userServices/sendVerifyEmail.js"
import { verifyEmail } from "./userServices/verifyEmail.js"

export const UserService = {
  registerUser,
  loginUser,
  sendVerifyEmail,
  verifyEmail,
  editUser,
  deleteUser,
}
