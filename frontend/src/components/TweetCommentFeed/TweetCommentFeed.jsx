import { useContext, useEffect, useState } from "react";
import "./TweetCommentFeed.css";
import { backendUrl } from "../../api/api";
import { accessTokenContext } from "../../context/Context";

const TweetCommentFeed = ({ singleTweet }) => {
  const { accessToken } = useContext(accessTokenContext);
  const [comments, setComments] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const tweetId = singleTweet?._id;

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
  }, []);

  // mit userId in gefetchten Comments die User-Daten holen (für Name, Profilbild, etc )
  // mit user- und comment-Daten Kommentare anzeigen lassen
  // via Input-Feld edit Comment hinzufügen
  // direkten re-render starten

  return (
    <div className="tweet-comment-feed">
      <p>TweetCommentFeed</p>
    </div>
  );
};

export default TweetCommentFeed;
