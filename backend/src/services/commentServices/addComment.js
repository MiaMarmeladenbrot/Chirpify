import { Comment } from "../../models/Comment.js";

export async function addComment(
  authenticatedUserId,
  { tweetId, message, taggedUsers }
) {
  if (!message) throw new Error("Your comment needs content!");
  if (message.length > 160)
    throw new Error("Comments cannot exceed a length of 160 characters.");
  if (!tweetId) throw new Error("Your comment has to refer to a tweet!");

  const newComment = await Comment.create({
    userId: authenticatedUserId,
    tweetId,
    message,
    taggedUsers,
  });

  return newComment;
}
