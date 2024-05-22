import { User } from "../../models/User.js"
import { userToView } from "../../utils/userToView.js"

export const showAllUsers = async () => {
  const users = await User.find({})
  return userToView(users)
  //   return users
}
