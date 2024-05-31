import { useContext, useState } from "react";
import {
  accessTokenContext,
  rerenderCounterContext,
} from "../../context/Context";
import { backendUrl } from "../../api/api";
import "./IconLike.css";

const IconLike = ({ singleTweet }) => {
  const { accessToken } = useContext(accessTokenContext);
  const { rerenderCounter, setRerenderCounter } = useContext(
    rerenderCounterContext
  );

  const tweetId = singleTweet._id;
  const tweetLikes = singleTweet.isLikedBy;
  const isLikedByLoggedInUser = singleTweet.isLikedByLoggedInUser;
  const [isLiked, setIsLiked] = useState(isLikedByLoggedInUser);

  const addLike = async () => {
    const res = tweetId
      ? await fetch(`${backendUrl}/api/v1/tweets/like`, {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tweetId }),
        })
      : await fetch(`${backendUrl}/api/v1/comments/like/${commentId}`, {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ commentId }),
        });

    const data = await res.json();

    setIsLiked(true);
    setRerenderCounter(rerenderCounter + 1);
  };

  const deleteLike = async () => {
    const res = tweetId
      ? await fetch(`${backendUrl}/api/v1/tweets/dislike`, {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tweetId }),
        })
      : // like a comment fehlt im backend noch
        await fetch(`${backendUrl}/api/v1/comments/like/${commentId}`, {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ commentId }),
        });

    const data = await res.json();

    setIsLiked(false);
    setRerenderCounter(rerenderCounter + 1);
  };

  return (
    <div className="like-icon">
      {isLiked ? (
        <svg
          onClick={deleteLike}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          height="16"
          width={20}
          fill="#ce395f"
          stroke="#ce395f"
          strokeWidth={40}
        >
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
        </svg>
      ) : (
        <svg
          onClick={addLike}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          height="16"
          width={20}
          fill="none"
          stroke="#687684"
          strokeWidth={40}
        >
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
        </svg>
      )}
      <p>{tweetLikes.length}</p>
    </div>
  );
};

export default IconLike;
