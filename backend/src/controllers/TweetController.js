import { TweetService } from "../services/index.js";

const postCreateTweetCtrl = async (req, res) => {
  try {
    const authenticatedUserId = req.authenticatedUserClaims.sub;
    const tweetInfo = req.body;
    const result = await TweetService.addTweet(authenticatedUserId, tweetInfo);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error, message: error.message || "Could not post new tweet." });
  }
};

export const TweetController = { postCreateTweetCtrl };
