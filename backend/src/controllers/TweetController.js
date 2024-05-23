import { TweetService } from "../services/index.js"

const postCreateTweetCtrl = async (req, res) => {
  try {
    const authenticatedUserId = req.authenticatedUserClaims.sub
    const tweetInfo = req.body
    const result = await TweetService.addTweet(authenticatedUserId, tweetInfo)
    res.json({ result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: error.message || "Could not post new tweet." })
  }
}

const patchUpdateTweetCtrl = async (req, res) => {
  try {
    const authenticatedUserId = req.authenticatedUserClaims.sub
    const updateTweetInfo = req.body
    const tweetId = req.params.tweetId
    const result = await TweetService.editTweet(authenticatedUserId, tweetId, updateTweetInfo)
    res.json({ result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: error.message || "Could not update tweet." })
  }
}

const deleteTweetCtrl = async (req, res) => {
  try {
    const tweetId = req.params.tweetId
    const authenticatedUserId = req.authenticatedUserClaims.sub

    const result = await TweetService.deleteTweet(authenticatedUserId, tweetId)
    res.json({ result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: error.message || "Could not delete tweet." })
  }
}

const getAllUserTweetsCtrl = async (req, res) => {
  try {
    const result = await TweetService.showUserTweets(req.params.userId)
    res.json({ result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: error.message || "Could not find tweets." })
  }
}

const patchLikeUsersTweetCrtl = async (req, res) => {
  try {
    const authenticatedUserId = req.authenticatedUserClaims.sub
    const tweetId = req.body.tweetId
    const result = await TweetService.likeUsersTweet(authenticatedUserId, tweetId)
    res.json({ result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: error.message || "Could not find tweets." })
  }
}

export const TweetController = {
  postCreateTweetCtrl,
  patchUpdateTweetCtrl,
  deleteTweetCtrl,
  getAllUserTweetsCtrl,
  patchLikeUsersTweetCrtl,
}
