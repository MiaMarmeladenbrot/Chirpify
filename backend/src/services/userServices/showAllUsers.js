import { User } from "../../models/User.js"

export const showAllUsers = async () => {
  const users = await User.find({})
  return users
}
