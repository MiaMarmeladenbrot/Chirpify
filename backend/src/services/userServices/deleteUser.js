import { User } from "../../models/User.js"

export const deleteUser = async (authenticatedUserId) => {
  const user = await User.findByIdAndDelete(authenticatedUserId)
  return user
}
