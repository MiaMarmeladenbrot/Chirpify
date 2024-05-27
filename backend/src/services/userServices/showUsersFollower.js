import { User } from "../../models/User.js";
import { userToView } from "../../utils/userToView.js";

export const showUsersFollower = async (authenticatedUserId) => {
  const usersFollowerArr = await User.find({ isFollowerOf: { $in: authenticatedUserId } });

  return userToView(usersFollowerArr);
};
