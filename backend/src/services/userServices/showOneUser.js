import { User } from "../../models/User.js"
import { userToView } from "../../utils/userToView.js"

export const showOneUser = async (userId) => {
  const user = await User.findById(userId)
  return userToView(user)
}
