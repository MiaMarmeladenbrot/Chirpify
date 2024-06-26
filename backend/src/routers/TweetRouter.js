import express from "express";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";
import { TweetController } from "../controllers/TweetController.js";

export const TweetRouter = express
  .Router()
  .post("/", doJwtAuth, TweetController.postCreateTweetCtrl)
  .patch("/like", doJwtAuth, TweetController.patchLikeUsersTweetCrtl)
  .patch("/dislike", doJwtAuth, TweetController.patchDislikeUsersTweetCrtl)
  .patch("/:tweetId", doJwtAuth, TweetController.patchUpdateTweetCtrl)
  .delete("/:tweetId", doJwtAuth, TweetController.deleteTweetCtrl)
  .get("/userFeed", doJwtAuth, TweetController.getShowUserFeed)
  .get("/of/:userId", doJwtAuth, TweetController.getAllUserTweetsCtrl)
  .get("/:tweetId", doJwtAuth, TweetController.getOneTweetCtrl);
