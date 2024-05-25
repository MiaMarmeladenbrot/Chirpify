import { useContext, useEffect, useState } from "react";
import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import TweetAddButton from "../../components/TweetAddButton/TweetAddButton";
import { backendUrl } from "../../api/api";
import { accessTokenContext, userFeedContext } from "../../context/Context";
import "./FeedPage.css";
import Tweet from "../../components/Tweet/Tweet";

// # hier den allUsers-Fetch global?

const FeedPage = () => {
  const { userFeed, setUserFeed } = useContext(userFeedContext);
  const { accessToken } = useContext(accessTokenContext);
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch(`${backendUrl}/api/v1/tweets/userFeed`, {
  //       headers: { authorization: `Bearer ${accessToken}` },
  //     });

  //     const data = await res.json();
  //     if (!data.result) {
  //       return setErrorMessage(data.message);
  //     }
  //     setUserFeed(data.result);
  //     setErrorMessage("");
  //   };
  //   fetchData();
  // }, []);
  // console.log(userFeed);

  return (
    <section className="feedpage">
      <HeaderNav />
      <h2>{errorMessage ? { errorMessage } : ""}</h2>

      {/* // # hier entsteht noch ein Fehler beim Neuladen - userFeed.map is not a function ... */}
      {userFeed?.map((singleTweet) => (
        <Tweet singleTweet={singleTweet} key={singleTweet._id} />
      ))}

      <TweetAddButton />
      <FooterNav />
    </section>
  );
};

export default FeedPage;
