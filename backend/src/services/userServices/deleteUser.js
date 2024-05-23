import { Comment } from "../../models/Comment.js";
import { Tweet } from "../../models/Tweet.js";
import { User } from "../../models/User.js";
import { userToView } from "../../utils/userToView.js";

export const deleteUser = async (authenticatedUserId) => {
  // authenticatedUserId finden in Tweets und seine tweets löschen
  await Tweet.deleteMany({
    userId: { $in: authenticatedUserId },
  });

  // authenticatedUserId finden in Comments und seine Kommentare löschen
  await Comment.deleteMany({
    userId: { $in: authenticatedUserId },
  });

  // authenticatedUserId finden in Tweets.isLikedBy und dort die Referenz löschen
  await Tweet.updateMany(
    {
      isLikedBy: { $in: authenticatedUserId },
    },
    { $pull: { isLikedBy: authenticatedUserId } },
    { new: true }
  );

  // authenticatedUserId finden in User.isFollowerOf und dort die Referenz löschen
  await User.updateMany(
    {
      isFollowerOf: { $in: authenticatedUserId },
    },
    { $pull: { isFollowerOf: authenticatedUserId } },
    { new: true }
  );

  // jetzt endlich den eigentlichen User löschen
  const user = await User.findByIdAndDelete(authenticatedUserId);
  return userToView(user);
};
