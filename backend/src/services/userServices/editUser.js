import { User } from "../../models/User.js";
import { userToView } from "../../utils/userToView.js";

export const editUser = async (authenticatedUserId, updatedInfo, userId) => {
  console.log(authenticatedUserId);
  console.log(userId);

  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("User not found.");
  if (!user.isEmailVerified) throw new Error("User not verified.");
  if (authenticatedUserId !== userId)
    throw new Error("You're not allowed to update information from other users");

  const updatedUser = await User.findByIdAndUpdate(
    authenticatedUserId,
    { $set: updatedInfo },
    { new: true }
  );

  return userToView(updatedUser);
};
