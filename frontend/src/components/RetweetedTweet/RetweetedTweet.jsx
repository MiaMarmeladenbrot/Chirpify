import { Link } from "react-router-dom";
import { backendUrl } from "../../api/api";

const RetweetedTweet = ({ retweetedTweet }) => {
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
  const retweetedTweetDate = changeTweetDateFormat(retweetedTweet?.createdAt);

  return (
    <>
      {retweetedTweet && (
        <section className="retweeted-tweet-box">
          <article>
            <article className="profile-area">
              <Link to={`/user/${retweetedTweet?.userId?._id}`}>
                <img
                  src={`${backendUrl}/${retweetedTweet?.userId?.profileImg}`}
                  alt={`Profile image of ${retweetedTweet?.userId?.username}`}
                />
              </Link>

              <article>
                <p>
                  {retweetedTweet?.userId?.firstname}{" "}
                  {retweetedTweet?.userId?.lastname}
                </p>
                <p>@{retweetedTweet?.userId?.username}</p>
              </article>
            </article>
            <p>{retweetedTweet?.message}</p>
            {/* hier wäre noch das Bild, falls es eines gibt */}

            <p className="time-of-tweet">
              {retweetedTweetAge.tweetAgeInHours > 23
                ? `${retweetedTweetDate.tweetDay}.${retweetedTweetDate.tweetMonth}.${retweetedTweetDate.tweetYear} ${retweetedTweetDate.tweetHours}:${retweetedTweetDate.tweetMinutes}`
                : `${retweetedTweetAge.showTweetAge}`}
            </p>
          </article>
        </section>
      )}
    </>
  );
};

export default RetweetedTweet;
