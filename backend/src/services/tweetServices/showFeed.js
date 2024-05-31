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
  const userFollowsIdsArr = user.isFollowerOf;

  // mit diesen Ids nach Tweets suchen
  const followerTweetsArr = await Tweet.find({
    userId: { $in: userFollowsIdsArr },
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

  // falls das array leer ist, also weder user- noch followTweets existieren, Fehler anzeigen
  if (unsortedUserFeedArr.length === 0) throw new Error("Nothing to show yet.");

  // prüfen, ob der User bereits Tweets geliket hat - als boolean speichern
  const unsortedUserFeedWithLikesArr = unsortedUserFeedArr.map((tweet) => ({
    ...tweet.toObject(),
    isLikedByLoggedInUser: tweet.isLikedBy.includes(
      authenticatedUserId.toString()
    ),
  }));

  // zusammengefügte Tweets nach Neuestem sortieren
  const sortedUserFeedArr = unsortedUserFeedWithLikesArr.sort(
    (a, b) => b.createdAt - a.createdAt
  );

  return sortedUserFeedArr;
};
