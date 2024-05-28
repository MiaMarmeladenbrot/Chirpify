import { User } from "../../models/User.js";
import { userToView } from "../../utils/userToView.js";

export const showUsersFollower = async (userId) => {
  const usersFollowerArr = await User.find({ isFollowerOf: { $in: userId } });

  return userToView(usersFollowerArr);
};
