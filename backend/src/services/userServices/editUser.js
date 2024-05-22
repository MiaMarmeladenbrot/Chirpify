import { User } from "../../models/User.js"
import { userToView } from "../../utils/userToView.js"

export const editUser = async (authenticatedUserId, updatedInfo) => {
  const user = await User.findById(authenticatedUserId)
  if (!user) throw new Error("User not found.")
  if (!user.isEmailVerified) throw new Error("User not verified.")

  const updatedUser = await User.findByIdAndUpdate(
    authenticatedUserId,
    { $set: updatedInfo },
    { new: true }
  )

  return userToView(updatedUser)
}
