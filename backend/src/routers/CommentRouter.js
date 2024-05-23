import express from "express";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";
import { CommentController } from "../controllers/CommentController.js";

export const CommentRouter = express
  .Router()
  .post("/", doJwtAuth, CommentController.postAddCommentCtrl)
  .patch("/:commentId", doJwtAuth, CommentController.patchEditCommentCtrl);
