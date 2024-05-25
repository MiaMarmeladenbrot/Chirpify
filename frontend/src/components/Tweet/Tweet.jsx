import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../api/api";
import { accessTokenContext } from "../../context/Context";
import "./Tweet.css";
import TweetCommentIcon from "../TweetCommentIcon/TweetCommentIcon";
import TweetRetweetIcon from "../TweetRetweetIcon/TweetRetweetIcon";
import TweetLikeIcon from "../TweetLikeIcon/TweetLikeIcon";
import TweetShareIcon from "../TweetShareIcon/TweetShareIcon";
import { Link } from "react-router-dom";

const Tweet = ({ singleTweet }) => {
  const { accessToken } = useContext(accessTokenContext);
  const [tweetOwner, setTweetOwner] = useState("");

  // createdAt: "2024-05-24T14:45:18.115Z";
  // isLikedBy: [];
  // message: "zweiter test post von mia";
  // retweetedTweetId: null;
  // updatedAt: "2024-05-24T14:45:18.115Z";
  // userId: "66505f381343ddd9afb36c7d";
  // __v: 0;
  // _id: "6650a7fec419afdfff7841fb";

  // mit userId den jeweiligen User fetchen, um seinen Namen und sein Bild anzeigen zu lassen:
  useEffect(() => {
    fetch(`${backendUrl}/api/v1/users/${singleTweet?.userId}`, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => setTweetOwner(data.result))
      .catch((err) => console.log(err));
  }, []);

  // wenn Tweet jünger als 24 Stunden ist, die Stunden berechnen und diese statt des Datums ausgeben:
  const tweetTimeAsTimestamp = Date.parse(singleTweet.createdAt);
  const tweetAge = Date.now() - tweetTimeAsTimestamp;
  const tweetAgeInMS = new Date(tweetAge);
  const tweetAgeInHours = tweetAgeInMS.getHours();

  // Datum des Tweets in anderem Format
  const tweetDay = new Date(tweetTimeAsTimestamp).getDay();
  const tweetMonth = new Date(tweetTimeAsTimestamp).getMonth();
  const tweetYear = new Date(tweetTimeAsTimestamp).getFullYear();
  const tweetMinutes = new Date(tweetTimeAsTimestamp).getMinutes();
  const tweetHours = new Date(tweetTimeAsTimestamp).getHours();

  return (
    <section className="single-tweet">
      {/* hier oben noch, letzter Like bzw. letzter Retweet des Tweets */}
      {/* mit position absolute noch ein Pfeilchen für edit Tweet einbauen */}
      <Link to={`/user/${singleTweet?.userId}`}>
        <img
          src={`${backendUrl}/${tweetOwner?.profileImg}`}
          alt={`Profile image of ${tweetOwner?.username}`}
        />
      </Link>

      <article>
        <div className="tweet-text">
          <p>
            {tweetOwner?.firstname} {tweetOwner?.lastname}
          </p>
          <p>@{tweetOwner?.username}</p>
          <p>
            {tweetAgeInHours > 24
              ? `${tweetDay}.${tweetMonth}.${tweetYear} at ${tweetHours}:${tweetMinutes}`
              : `${tweetAgeInHours}h`}
          </p>
        </div>
        <p>{singleTweet?.message}</p>

        {/* // hier retweet darstellen, falls vorhanden, mit retweetedTweetId */}
        {singleTweet?.retweetedTweetId && (
          <p>Retweet von {singleTweet?.retweetedTweetId}</p>
        )}

        <div className="tweet-icons">
          <TweetCommentIcon />
          <TweetRetweetIcon singleTweet={singleTweet} />
          <TweetLikeIcon />
          <TweetShareIcon />
        </div>
      </article>
    </section>
  );
};

export default Tweet;
