import { User } from "../../models/User.js"

export const editUser = async (authenticatedUserId, updatedInfo) => {
  const user = await User.findById(authenticatedUserId)
  if (!user) throw new Error("User not found.")
  if (!user.isEmailVerified) throw new Error("User not verified.")

  const updatedUser = await User.findByIdAndUpdate(
    authenticatedUserId,
    { $set: updatedInfo },
    { new: true }
  )

  return {
    _id: updatedUser._id,
    firstname: updatedUser.firstname,
    lastname: updatedUser.lastname,
    email: updatedUser.email,
    isEmailVerified: updatedUser.isEmailVerified,
    isFollowerOf: updatedUser.isFollowerOf,
    profileImg: updatedUser.profileImg,
    description: updatedUser.description,
  }
}
