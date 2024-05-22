import { User } from "../../models/User.js"
import { userToView } from "../../utils/userToView.js"

export async function verifyEmail(authenticatedUserId, sixDigitCode) {
  const user = await User.findById(authenticatedUserId)
  if (!user) throw new Error("User not found.")

  const correctCode = user.sixDigitCode === sixDigitCode
  if (!correctCode) throw new Error("Email verification failed.")

  const updatedUser = await User.findByIdAndUpdate(
    authenticatedUserId,
    {
      $set: { isEmailVerified: true },
    },
    { new: true }
  )
  return userToView(updatedUser)
}
