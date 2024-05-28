import { useContext, useEffect, useState } from "react";
import "./TweetCommentFeed.css";
import { backendUrl } from "../../api/api";
import { accessTokenContext } from "../../context/Context";
import TweetAddComment from "../TweetAddComment/TweetAddComment";

const TweetCommentFeed = ({
  singleTweet,
  rerenderCounter,
  setRerenderCounter,
}) => {
  const { accessToken } = useContext(accessTokenContext);
  const [comments, setComments] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const tweetId = singleTweet?._id;
  const user = singleTweet?.userId;

  useEffect(() => {
    const fetchAllCommentsOfTweet = async () => {
      const res = await fetch(`${backendUrl}/api/v1/comments/${tweetId}`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      console.log(data);
      if (!data.result) {
        return setErrorMessage(data.message);
      }
      setComments(data.result);
      console.log(comments);
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
    <>
      {comments?.length !== 0 ? (
        <div className="tweet-comment-feed">
          {comments?.map((singleComment) => (
            <div key={singleComment._id} className="single-comment">
              <div className="comment-profile-area">
                <img
                  src={`${backendUrl}/${singleComment?.userId?.profileImg}`}
                  alt={singleComment?.userId?.username}
                />
                <p>{singleComment?.userId?.firstname}</p>
                <p>{singleComment?.userId?.lastname}</p>
                <p>@{singleComment?.userId?.username}</p>
              </div>
              <p>{singleComment?.message}</p>
            </div>
          ))}
          {/* hier input feld, um selbst einen Kommentar hinzuzufügen - dabei rerenderCount setten */}
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
    </>
  );
};

export default TweetCommentFeed;
