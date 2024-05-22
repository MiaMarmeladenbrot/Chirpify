import { User } from "../../models/User.js";

export async function verifyEmail(authenticatedUserId, sixDigitCode) {
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("User not found.");

  const correctCode = user.sixDigitCode === sixDigitCode;
  if (!correctCode) throw new Error("Email verification failed.");

  const updatedUser = await User.findByIdAndUpdate(
    authenticatedUserId,
    {
      $set: { isEmailVerified: true },
    },
    { new: true }
  );

  return {
    _id: updatedUser._id,
    firstname: updatedUser.firstname,
    lastname: updatedUser.lastname,
    email: updatedUser.email,
    isEmailVerified: updatedUser.isEmailVerified,
  };
}
