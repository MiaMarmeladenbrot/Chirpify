import { Tweet } from "../../models/Tweet.js";
import { User } from "../../models/User.js";

export const showUserTweets = async (authenticatedUserId, userId) => {
  const [user, authenticatedUser] = await Promise.all([
    User.findById(userId),
    User.findById(authenticatedUserId),
  ]);
  if (!user || !authenticatedUser) throw new Error("User does not exist.");

  // alle Tweets des gesuchten Users mit Daten zum User und zum Retweet, falls vorhanden, sortiert nach neuestem zuerst
  const allUserTweets = await Tweet.find({ userId })
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
    })
    .sort({ createdAt: -1 });

  // falls das array leer ist, also weder user- noch followTweets existieren, Fehler anzeigen
  if (allUserTweets.length === 0) throw new Error("Nothing to show yet.");

  // prüfen, ob der eingeloggte User bereits Tweets geliket hat - als boolean speichern
  const allUserTweetsWithLikes = allUserTweets.map((tweet) => ({
    ...tweet.toObject(),
    isLikedByLoggedInUser: tweet.isLikedBy.includes(
      authenticatedUserId.toString()
    ),
  }));

  return allUserTweetsWithLikes;
};
