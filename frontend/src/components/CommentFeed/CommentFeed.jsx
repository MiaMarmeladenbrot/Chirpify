import { useContext, useEffect, useState } from "react";
import "./CommentFeed.css";
import { backendUrl } from "../../api/api";
import {
  accessTokenContext,
  rerenderCounterContext,
} from "../../context/Context";

import Comment from "../Comment/Comment";
import AddComment from "../AddComment/AddComment";

const CommentFeed = ({ singleTweet }) => {
  const { accessToken } = useContext(accessTokenContext);
  const { rerenderCounter } = useContext(rerenderCounterContext);
  const [comments, setComments] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const tweetId = singleTweet?._id;

  useEffect(() => {
    const fetchAllCommentsOfTweet = async () => {
      const res = await fetch(`${backendUrl}/api/v1/comments/${tweetId}`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      if (!data.result) {
        return setErrorMessage(data.message || "Cannot find any comments.");
      }
      setComments(data.result);
      setErrorMessage("");
    };
    fetchAllCommentsOfTweet();
  }, [rerenderCounter]);

  return (
    <section className="comments">
      <article className="comments-with-input">
        {errorMessage ? <p>{errorMessage}</p> : ""}
        {comments?.length !== 0 ? (
          <div className="tweet-comment-feed">
            {comments?.map((singleComment) => (
              <Comment
                key={singleComment._id}
                singleComment={singleComment}
                setErrorMessage={setErrorMessage}
              />
            ))}
          </div>
        ) : (
          <div className="tweet-comment-feed">
            <p>No comments yet</p>
          </div>
        )}
        <AddComment tweetId={tweetId} />
      </article>
    </section>
  );
};

export default CommentFeed;
