import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../api/api";
import { accessTokenContext, userContext } from "../../context/Context";
import "./Tweet.css";
import TweetCommentIcon from "../TweetCommentIcon/TweetCommentIcon";
import TweetRetweetIcon from "../TweetRetweetIcon/TweetRetweetIcon";
import TweetLikeIcon from "../TweetLikeIcon/TweetLikeIcon";
import TweetShareIcon from "../TweetShareIcon/TweetShareIcon";
import { Link } from "react-router-dom";
import TweetDeleteIcon from "../TweetDeleteIcon/TweetDeleteIcon";
import TweetEditIcon from "../TweetEditIcon/TweetEditIcon";

const Tweet = ({ singleTweet }) => {
  const { accessToken } = useContext(accessTokenContext);
  const { user } = useContext(userContext);
  const [tweetOwner, setTweetOwner] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
  const tweetDate = new Date(singleTweet.createdAt);
  const tweetTimeAsTimestamp = Date.parse(tweetDate);
  const tweetAge = Date.now() - tweetTimeAsTimestamp;
  const tweetAgeInMin = Math.floor(tweetAge / 1000 / 60);
  const tweetAgeInHours = Math.floor(tweetAgeInMin / 60);
  const showTweetAge =
    tweetAgeInHours < 1 ? `${tweetAgeInMin}min` : `${tweetAgeInHours}h`;

  // Datum des Tweets in anderem Format
  let tweetDay = new Date(tweetDate).getDate();
  tweetDay = tweetDay < 10 ? `0${tweetDay}` : tweetDay;
  let tweetMonth = new Date(tweetDate).getMonth() + 1;
  tweetMonth = tweetMonth < 10 ? `0${tweetMonth}` : tweetMonth;
  const tweetYear = new Date(tweetDate).getFullYear();
  let tweetHours = new Date(tweetDate).getHours();
  tweetHours = tweetHours < 10 ? `0${tweetHours}` : tweetHours;
  let tweetMinutes = new Date(tweetDate).getMinutes();
  tweetMinutes = tweetMinutes < 10 ? `0${tweetMinutes}` : tweetMinutes;

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
        <section className="text-area">
          <div className="tweet-text">
            <p>
              {tweetOwner?.firstname} {tweetOwner?.lastname}
            </p>
            <p>@{tweetOwner?.username}</p>

            <p>
              {tweetAgeInHours > 23
                ? `${tweetDay}.${tweetMonth}.${tweetYear} ${tweetHours}:${tweetMinutes}`
                : `${showTweetAge}`}
            </p>
          </div>
          <p>{singleTweet?.message}</p>
          {/* // hier retweet darstellen, falls vorhanden, mit retweetedTweetId */}
          {singleTweet?.retweetedTweetId && (
            <p>Retweet von {singleTweet?.retweetedTweetId}</p>
          )}
        </section>

        {singleTweet?.userId === user._id ? (
          <div className="tweet-menu">
            <TweetEditIcon singleTweet={singleTweet} />
            <TweetDeleteIcon
              singleTweet={singleTweet}
              setErrorMessage={setErrorMessage}
            />
          </div>
        ) : (
          ""
        )}

        <div className="tweet-icons">
          <TweetCommentIcon singleTweet={singleTweet} />
          <TweetRetweetIcon singleTweet={singleTweet} />
          <TweetLikeIcon />
          <TweetShareIcon />
        </div>
      </article>
    </section>
  );
};

export default Tweet;
