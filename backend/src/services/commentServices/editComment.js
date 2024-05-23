import { Comment } from "../../models/Comment.js";

export async function editComment(commentId, commentUpdateInfo) {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("This comment does not exist.");

  // falls eine message geändert werden soll, darf sie nur max 160 Zeichen lang sein
  if (commentUpdateInfo.message?.length > 160)
    throw new Error("Comments cannot exceed a length of 160 characters.");

  // falls eine message geändert werden soll, darf sie nicht leer sein
  if (commentUpdateInfo.message?.length < 1)
    throw new Error("Comments need content - what do you wanna say?");

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: commentUpdateInfo,
    },
    { new: true }
  );

  return updatedComment;
}
