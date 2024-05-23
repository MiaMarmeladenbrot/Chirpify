import { CommentService } from "../services/index.js";

export const addCommentCtrl = async (req, res) => {
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

export const CommentController = {
  addCommentCtrl,
};
