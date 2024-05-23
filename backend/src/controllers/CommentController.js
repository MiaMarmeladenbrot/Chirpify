import { CommentService } from "../services/index.js";

export const postAddCommentCtrl = async (req, res) => {
  try {
    const authenticatedUserId = req.authenticatedUserClaims.sub;
    const commentInfo = req.body;

    const result = await CommentService.addComment(
      authenticatedUserId,
      commentInfo
    );
    res.json({ result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error, message: error.message || "Could not add comment" });
  }
};

export const patchEditCommentCtrl = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const commentUpdateInfo = req.body;

    const result = await CommentService.editComment(
      commentId,
      commentUpdateInfo
    );
    res.json({ result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error, message: error.message || "Could not edit comment" });
  }
};

export const CommentController = {
  postAddCommentCtrl,
  patchEditCommentCtrl,
};
