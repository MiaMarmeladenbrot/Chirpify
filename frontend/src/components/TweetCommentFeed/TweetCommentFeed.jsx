import { useContext, useEffect, useState } from "react";
import "./TweetCommentFeed.css";
import { backendUrl } from "../../api/api";
import { accessTokenContext } from "../../context/Context";
import TweetAddComment from "../TweetAddComment/TweetAddComment";

import Comment from "../Comment/Comment";

const TweetCommentFeed = ({
  singleTweet,
  rerenderCounter,
  setRerenderCounter,
}) => {
  const { accessToken } = useContext(accessTokenContext);
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

  // createdAt : "2024-05-28T14:00:11.453Z"
  // message : "genau so"
  // taggedUsers : []
  // tweetId : "6655cf014112a02029cf685c"
  // updatedAt : "2024-05-28T14:00:11.453Z"
  // userId :
  //    firstname : "Mia"
  //    lastname : "M"
  //    profileImg: "placeholder.jpg"
  //    username: "MiaMaRmElAdE"
  //    _id : "66505f381343ddd9afb36c7d"
  // __v : 0
  // _id: "6655e36bcf8970ce433d0970"

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
                rerenderCounter={rerenderCounter}
                setRerenderCounter={setRerenderCounter}
              />
            ))}
          </div>
        ) : (
          <div className="tweet-comment-feed">
            <p>No comments yet</p>
          </div>
        )}
        <TweetAddComment
          tweetId={tweetId}
          rerenderCounter={rerenderCounter}
          setRerenderCounter={setRerenderCounter}
        />
      </article>
    </section>
  );
};

export default TweetCommentFeed;
