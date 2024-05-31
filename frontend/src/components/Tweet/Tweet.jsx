import { useContext, useState } from "react";
import { backendUrl } from "../../api/api";
import { userContext } from "../../context/Context";
import "./Tweet.css";
import TweetCommentIcon from "../TweetCommentIcon/TweetCommentIcon";
import TweetRetweetIcon from "../TweetRetweetIcon/TweetRetweetIcon";
import TweetLikeIcon from "../TweetLikeIcon/TweetLikeIcon";
import TweetShareIcon from "../TweetShareIcon/TweetShareIcon";
import { Link } from "react-router-dom";
import IconEdit from "../IconEdit/IconEdit";
import TweetCommentFeed from "../TweetCommentFeed/TweetCommentFeed";
import IconDelete from "../IconDelete/IconDelete";

const Tweet = ({ singleTweet }) => {
  const { user } = useContext(userContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [showComments, setShowComments] = useState(false);
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
      tweetAgeInHours >= 1
        ? `${tweetAgeInHours} h ago`
        : tweetAgeInMin > 1
        ? `${tweetAgeInMin} min ago`
        : "just now";

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
            {retweetedTweet && (
              <section className="retweeted-tweet-box">
                <div>
                  <div className="profile-area">
                    <Link to={`/user/${retweetedTweet?.userId?._id}`}>
                      <img
                        src={`${backendUrl}/${retweetedTweet?.userId?.profileImg}`}
                        alt={`Profile image of ${retweetedTweet?.userId?.username}`}
                      />
                    </Link>

                    <div>
                      <p>
                        {retweetedTweet?.userId?.firstname}{" "}
                        {retweetedTweet?.userId?.lastname}
                      </p>
                      <p>@{retweetedTweet?.userId?.username}</p>
                    </div>
                  </div>
                  <p>{retweetedTweet?.message}</p>
                  {/* hier wäre noch das Bild, falls es eines gibt */}

                  <p className="time-of-tweet">
                    {retweetedTweetAge.tweetAgeInHours > 23
                      ? `${retweetedTweetDate.tweetDay}.${retweetedTweetDate.tweetMonth}.${retweetedTweetDate.tweetYear} ${retweetedTweetDate.tweetHours}:${retweetedTweetDate.tweetMinutes}`
                      : `${retweetedTweetAge.showTweetAge}`}
                  </p>
                </div>
              </section>
            )}

            <p className="time-of-tweet">
              {newTweetAge.tweetAgeInHours > 23
                ? `${newTweetDate.tweetDay}.${newTweetDate.tweetMonth}.${newTweetDate.tweetYear} ${newTweetDate.tweetHours}:${newTweetDate.tweetMinutes}`
                : `${newTweetAge.showTweetAge}`}
            </p>
          </section>

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

          <div className="tweet-icons">
            <TweetCommentIcon
              showComments={showComments}
              setShowComments={setShowComments}
            />
            <TweetRetweetIcon retweetedTweetId={singleTweet._id} />
            <TweetLikeIcon
              tweetId={singleTweet._id}
              isLikedByLoggedInUser={singleTweet.isLikedByLoggedInUser}
            />
            <TweetShareIcon />
          </div>

          {showComments && <TweetCommentFeed singleTweet={singleTweet} />}
        </article>
      </section>
    </>
  );
};

export default Tweet;
