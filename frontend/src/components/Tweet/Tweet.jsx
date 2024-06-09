import { useContext, useState } from "react";
import { backendUrl } from "../../api/api";
import { userContext } from "../../context/Context";
import "./Tweet.css";

import TweetCommentIcon from "../TweetCommentIcon/TweetCommentIcon";
import TweetRetweetIcon from "../TweetRetweetIcon/TweetRetweetIcon";
import TweetShareIcon from "../TweetShareIcon/TweetShareIcon";
import { Link } from "react-router-dom";
import IconEdit from "../IconEdit/IconEdit";
import IconDelete from "../IconDelete/IconDelete";
import CommentFeed from "../CommentFeed/CommentFeed";
import IconLike from "../IconLike/IconLike";
import RetweetedTweet from "../RetweetedTweet/RetweetedTweet";

const Tweet = ({ singleTweet }) => {
  const { user } = useContext(userContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [showComments, setShowComments] = useState(false);
  const tweetOwner = singleTweet?.userId;
  const retweetedTweetInfo = singleTweet?.retweetedTweetId;

  // function to calculate the age of a tweet and show it in different ways, depending on the time that passed
  const calculateTweetAge = (createdAt) => {
    const tweetDate = new Date(createdAt); // Tue May 28 2024 14:10:39 GMT+0200 (Mitteleuropäische Sommerzeit)
    const tweetTimeAsTimestamp = Date.parse(tweetDate); // 1716898239000
    const tweetAge = Date.now() - tweetTimeAsTimestamp; // 620037
    const tweetAgeInMin = Math.floor(tweetAge / 1000 / 60); // 10
    const tweetAgeInHours = Math.floor(tweetAgeInMin / 60); // 0
    const showTweetAge =
      tweetAgeInHours >= 1
        ? `${tweetAgeInHours} h ago`
        : tweetAgeInMin > 1
        ? `${tweetAgeInMin} min ago`
        : "just now";

    return { showTweetAge, tweetAgeInHours };
  };
  const newTweetAge = calculateTweetAge(singleTweet?.createdAt);
  // const retweetedTweetAge = calculateTweetAge(retweetedTweet?.createdAt);

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
  // const retweetedTweetDate = changeTweetDateFormat(retweetedTweet?.createdAt);

  return (
    <>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      <section className="single-tweet">
        {/* //* hier oben noch ergänzen: letzter Like bzw. letzter Retweet des Tweets */}

        <article>
          <section className="new-tweet-area">
            <div className="profile-area">
              <Link to={`/user/${tweetOwner?._id}`}>
                <img
                  src={`${backendUrl}/${tweetOwner?.profileImg}`}
                  alt={`Profile image of ${tweetOwner?.username}`}
                />
              </Link>

              <div>
                <p>
                  {tweetOwner?.firstname} {tweetOwner?.lastname}
                </p>
                <p>@{tweetOwner?.username}</p>
              </div>
            </div>

            {toggleEdit ? (
              <textarea
                name="edit-tweet"
                id="edit-tweet"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              >
                {message}
              </textarea>
            ) : (
              <p>{singleTweet?.message}</p>
            )}

            {/* hier wäre noch das Bild, falls es eines gibt */}

            {/* show retweeted Tweet if it exists */}
            <RetweetedTweet retweetedTweet={retweetedTweetInfo} />

            {/* show age or date/time of the tweet */}
            <p className="time-of-tweet">
              {newTweetAge.tweetAgeInHours > 23
                ? `${newTweetDate.tweetDay}.${newTweetDate.tweetMonth}.${newTweetDate.tweetYear} ${newTweetDate.tweetHours}:${newTweetDate.tweetMinutes}`
                : `${newTweetAge.showTweetAge}`}
            </p>
          </section>

          {/* if it's a tweet of the logged-in user, show delete/edit options */}
          {tweetOwner?._id === user._id ? (
            <div className="tweet-menu">
              <IconDelete
                singleTweet={singleTweet}
                setErrorMessage={setErrorMessage}
              />
              <IconEdit
                singleTweet={singleTweet}
                message={message}
                setMessage={setMessage}
                setErrorMessage={setErrorMessage}
                toggleEdit={toggleEdit}
                setToggleEdit={setToggleEdit}
              />
            </div>
          ) : (
            ""
          )}

          {/* show icons to comment, retweet, like, share the tweet */}
          <div className="tweet-icons">
            <TweetCommentIcon
              showComments={showComments}
              setShowComments={setShowComments}
            />
            <TweetRetweetIcon retweetedTweetId={singleTweet._id} />
            <IconLike singleTweet={singleTweet} />
            <TweetShareIcon />
          </div>

          {/* show the comments for the tweet */}
          {showComments && <CommentFeed singleTweet={singleTweet} />}
        </article>
      </section>
    </>
  );
};

export default Tweet;
