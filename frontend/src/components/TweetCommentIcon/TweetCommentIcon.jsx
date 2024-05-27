import { useState } from "react";
import TweetCommentFeed from "../TweetCommentFeed/TweetCommentFeed";

const TweetCommentIcon = ({ singleTweet }) => {
  const [showComments, setShowComments] = useState(false);
  return (
    <div>
      <svg
        className="tweet-comment-icon"
        onClick={() => setShowComments(!showComments)}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 10.25C7.27614 10.25 7.5 10.4739 7.5 10.75V12.7079C10.2487 11.1024 11.9025 9.96659 12.8999 8.97494C13.4787 8.39946 13.7971 7.9087 13.982 7.44074C14.1679 6.97021 14.25 6.44448 14.25 5.75C14.25 3.26472 12.2353 1.25 9.75 1.25H6.25C3.76472 1.25 1.75 3.26472 1.75 5.75C1.75 8.23528 3.76472 10.25 6.25 10.25H7ZM7.5 14.1529C14.1641 10.3177 15.5 8.74691 15.5 5.75C15.5 2.57436 12.9256 0 9.75 0H6.25C3.07436 0 0.5 2.57436 0.5 5.75C0.5 8.92564 3.07436 11.5 6.25 11.5V14.0086C6.25 14.3911 6.66196 14.6318 6.9943 14.4424C7.16618 14.3445 7.33473 14.248 7.5 14.1529Z"
          fill="#687684"
        />
      </svg>
      {showComments && <TweetCommentFeed singleTweet={singleTweet} />}
    </div>
  );
};

export default TweetCommentIcon;
