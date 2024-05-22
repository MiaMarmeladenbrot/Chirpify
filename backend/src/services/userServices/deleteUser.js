import { User } from "../../models/User.js"
import { userToView } from "../../utils/userToView.js"

export const deleteUser = async (authenticatedUserId) => {
  const user = await User.findByIdAndDelete(authenticatedUserId)
  return userToView(user)
}
