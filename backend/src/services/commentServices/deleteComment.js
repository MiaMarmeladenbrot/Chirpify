import { Comment } from "../../models/Comment.js";

export async function deleteComment(commentId) {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("This comment does not exist.");

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  return deletedComment;
}
