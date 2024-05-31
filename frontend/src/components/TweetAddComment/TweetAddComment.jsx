import { useContext, useState } from "react";
import "./TweetAddComment.css";
import { backendUrl } from "../../api/api";
import {
  accessTokenContext,
  rerenderCounterContext,
} from "../../context/Context";

const TweetAddComment = ({ tweetId }) => {
  const { accessToken } = useContext(accessTokenContext);
  const { rerenderCounter, setRerenderCounter } = useContext(
    rerenderCounterContext
  );

  const [message, setMessage] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const postNewComment = async (e) => {
    e.preventDefault();

    if (message.length > 160)
      return setErrorMessage(
        "We know you have a lot to say, but unfortunately your tweet cannot exceed 160 characters."
      );

    const res = await fetch(`${backendUrl}/api/v1/comments`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, tweetId }),
    });

    const data = await res.json();
    if (!data.result)
      setErrorMessage(data.message || "Could not add your comment.");
    const newComment = data.result;
    setErrorMessage("");
    setMessage("");
    setRerenderCounter(rerenderCounter + 1);
  };

  return (
    <>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      <div className="add-comment">
        <input
          type="text"
          placeholder="What do you think?"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button onClick={postNewComment}>Comment</button>
      </div>
    </>
  );
};

export default TweetAddComment;
