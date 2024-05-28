import { Tweet } from "../../models/Tweet.js";
import { User } from "../../models/User.js";

export const showFeed = async (authenticatedUserId) => {
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("User does not exist");

  // alle tweets des authentifizierten Users
  const userTweets = await Tweet.find({ userId: authenticatedUserId })
    .populate({
      path: "userId",
      select: "_id firstname lastname username profileImg",
    })
    .populate({
      path: "retweetedTweetId",
      select: "_id userId message createdAt",
      populate: {
        path: "userId",
        select: "_id firstname lastname username profileImg",
      },
    });

  // alle Tweets von den Leuten, denen der user folgt - als array mit ids als ObjectIds
  const userFollowsIdArr = user.isFollowerOf;

  // jede einzelne ObjectId in einen String umwandeln
  const userFollowerIdStringsArr = userFollowsIdArr.map((item) =>
    item.toString()
  );

  // mit string-Ids nach Tweets suchen
  const followerTweetsArr = await Tweet.find({
    userId: { $in: userFollowerIdStringsArr },
  })
    .populate({
      path: "userId",
      select: "_id firstname lastname username profileImg",
    })
    .populate({
      path: "retweetedTweetId",
      select: "_id userId message createdAt",
      populate: {
        path: "userId",
        select: "_id firstname lastname username profileImg",
      },
    });

  // userTweets und followTweets zusammenfügen, ist aber noch unsortiert
  const unsortedUserFeedArr = [...userTweets, ...followerTweetsArr];

  // falls das leer ist, also weder user- noch followTweets existieren, Fehler anzeigen
  if (unsortedUserFeedArr.length === 0) throw new Error("Nothing to show yet");

  // zusammengefügte Tweets nach Neuestem sortieren
  const sortedUserFeedArr = unsortedUserFeedArr.sort(
    (a, b) => b.createdAt - a.createdAt
  );

  return sortedUserFeedArr;
};
