import { User } from "../../models/User.js";
import { userToView } from "../../utils/userToView.js";

export async function unfollowUser(authenticatedUserId, userIdToFollow) {
  // userIdToFollow aus array von authenticatedUserId.isFollowerOf entfernen

  // const userToFollow = await User.findById(userIdToFollow);
  // if (!userToFollow) throw new Error("This user does not exist.");

  const userWantsToFollow = await User.findById(authenticatedUserId);

  if (!userWantsToFollow.isFollowerOf.includes(userIdToFollow))
    throw new Error("You never followed this user.");

  const updatedUser = await User.findOneAndUpdate(
    { _id: authenticatedUserId },
    {
      $pull: { isFollowerOf: userIdToFollow },
    },
    { new: true }
  );

  return userToView(updatedUser);
}
