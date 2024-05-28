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
  const { user } = useContext(userContext);
  const tweetOwner = singleTweet?.userId;
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [message, setMessage] = useState("");

  // wenn Tweet jünger als 24 Stunden ist, die Stunden berechnen und diese statt des Datums ausgeben:
  const tweetDate = new Date(singleTweet.createdAt);
  const tweetTimeAsTimestamp = Date.parse(tweetDate);
  const tweetAge = Date.now() - tweetTimeAsTimestamp;
  const tweetAgeInMin = Math.floor(tweetAge / 1000 / 60);
  const tweetAgeInHours = Math.floor(tweetAgeInMin / 60);
  const showTweetAge =
    tweetAgeInHours > 1
      ? `${tweetAgeInHours}h`
      : tweetAgeInMin > 1
      ? `${tweetAgeInMin}min`
      : "now";

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
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}

      {/* //* hier oben noch ergänzen: letzter Like bzw. letzter Retweet des Tweets */}

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

          {toggleEdit ? (
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          ) : (
            <p>{singleTweet?.message}</p>
          )}

          {/* // hier retweet darstellen, falls vorhanden, mit retweetedTweetId */}
          {singleTweet?.retweetedTweetId && (
            <p>Retweet von {singleTweet?.retweetedTweetId}</p>
          )}
        </section>

        {tweetOwner?._id === user._id ? (
          <div className="tweet-menu">
            <TweetEditIcon
              singleTweet={singleTweet}
              message={message}
              setMessage={setMessage}
              setErrorMessage={setErrorMessage}
              toggleEdit={toggleEdit}
              setToggleEdit={setToggleEdit}
            />
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
