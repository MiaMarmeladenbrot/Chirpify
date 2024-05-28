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

  const [errorMessage, setErrorMessage] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [message, setMessage] = useState("");
  const tweetOwner = singleTweet?.userId;
  const retweetedTweet = singleTweet?.retweetedTweetId;

  // function to calculate the age of a tweet and show it in different ways, depending on the time that passed
  const calculateTweetAge = (createdAt) => {
    const tweetDate = new Date(createdAt); // Tue May 28 2024 14:10:39 GMT+0200 (Mitteleuropäische Sommerzeit)
    const tweetTimeAsTimestamp = Date.parse(tweetDate); // 1716898239000
    const tweetAge = Date.now() - tweetTimeAsTimestamp; // 620037
    const tweetAgeInMin = Math.floor(tweetAge / 1000 / 60); // 10
    const tweetAgeInHours = Math.floor(tweetAgeInMin / 60); // 0
    const showTweetAge =
      tweetAgeInHours > 1
        ? `${tweetAgeInHours}h`
        : tweetAgeInMin > 1
        ? `${tweetAgeInMin}min`
        : "now";

    return { showTweetAge, tweetAgeInHours };
  };
  const newTweetAge = calculateTweetAge(singleTweet?.createdAt);
  const retweetedTweetAge = calculateTweetAge(retweetedTweet?.createdAt);

  // function to change date format of tweets
  const changeTweetDateFormat = (createdAt) => {
    const tweetDate = new Date(createdAt);
    let tweetDay = new Date(tweetDate).getDate();
    tweetDay = tweetDay < 10 ? `0${tweetDay}` : tweetDay;
    let tweetMonth = new Date(tweetDate).getMonth() + 1;
    tweetMonth = tweetMonth < 10 ? `0${tweetMonth}` : tweetMonth;
    const tweetYear = new Date(tweetDate).getFullYear();
    let tweetHours = new Date(tweetDate).getHours();
    tweetHours = tweetHours < 10 ? `0${tweetHours}` : tweetHours;
    let tweetMinutes = new Date(tweetDate).getMinutes();
    tweetMinutes = tweetMinutes < 10 ? `0${tweetMinutes}` : tweetMinutes;

    return { tweetDay, tweetMonth, tweetYear, tweetHours, tweetMinutes };
  };
  const newTweetDate = changeTweetDateFormat(singleTweet?.createdAt);
  const retweetedTweetDate = changeTweetDateFormat(retweetedTweet?.createdAt);

  return (
    <section className="single-tweet">
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}

      {/* //* hier oben noch ergänzen: letzter Like bzw. letzter Retweet des Tweets */}

      <Link to={`/user/${tweetOwner?._id}`}>
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
              {newTweetAge.tweetAgeInHours > 23
                ? `${newTweetDate.tweetDay}.${newTweetDate.tweetMonth}.${newTweetDate.tweetYear} ${newTweetDate.tweetHours}:${newTweetDate.tweetMinutes}`
                : `${newTweetAge.showTweetAge}`}
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

          {retweetedTweet && (
            <div className="retweeted-tweet-box">
              <div className="tweet-text">
                <p>
                  {retweetedTweet?.userId?.firstname}{" "}
                  {retweetedTweet?.userId?.lastname}
                </p>
                <p>@{retweetedTweet?.userId?.username}</p>

                <p>
                  {retweetedTweetAge.tweetAgeInHours > 23
                    ? `${retweetedTweetDate.tweetDay}.${retweetedTweetDate.tweetMonth}.${retweetedTweetDate.tweetYear} ${retweetedTweetDate.tweetHours}:${retweetedTweetDate.tweetMinutes}`
                    : `${retweetedTweetAge.showTweetAge}`}
                </p>
              </div>
              <p>{retweetedTweet?.message}</p>
            </div>
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
