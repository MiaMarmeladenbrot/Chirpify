import express from "express"
import { doJwtAuth } from "../middlewares/doJwtAuth.js"
import { TweetController } from "../controllers/TweetController.js"

export const TweetRouter = express
  .Router()
  .post("/", doJwtAuth, TweetController.postCreateTweetCtrl)
  .patch("/:tweetId", doJwtAuth, TweetController.patchUpdateTweetCtrl)
  .delete("/:tweetId", doJwtAuth, TweetController.deleteTweetCtrl)
  .get("/:userId", doJwtAuth, TweetController.getAllUserTweetsCtrl)
