import { User } from "../../models/User.js";
import { userToView } from "../../utils/userToView.js";

export async function followUser(authenticatedUserId, userIdToFollow) {
  // userIdToFollow pushen ins array von authenticatedUserId.isFollowerOf

  const userToFollow = await User.findById(userIdToFollow);
  if (!userToFollow) throw new Error("This user does not exist.");

  const userWantsToFollow = await User.findById(authenticatedUserId);

  //   const userIdToString =
  //     mongoose.Types.ObjectId.createFromHexString(authenticatedUserId);

  if (userWantsToFollow.isFollowerOf.includes(userIdToFollow))
    throw new Error("You already follow this user.");

  const updatedUser = await User.findOneAndUpdate(
    { _id: authenticatedUserId },
    {
      $addToSet: { isFollowerOf: userIdToFollow },
    },
    { new: true }
  );

  return userToView(updatedUser);
}
