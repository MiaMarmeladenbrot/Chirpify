import { useContext, useEffect } from "react";
import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import TweetAddButton from "../../components/TweetAddButton/TweetAddButton";
import {
  accessTokenContext,
  errorMessageContext,
  rerenderCounterContext,
  userFeedContext,
} from "../../context/Context";
import "./FeedPage.css";
import Tweet from "../../components/Tweet/Tweet";
import { backendUrl } from "../../api/api";

const FeedPage = () => {
  // const { userFeed } = useContext(userFeedContext);
  const { userFeed, setUserFeed } = useContext(userFeedContext);
  const { accessToken } = useContext(accessTokenContext);
  const { rerenderCounter } = useContext(rerenderCounterContext);

  const { errorMessage, setErrorMessage } = useContext(errorMessageContext);

  useEffect(() => {
    const fetchUserFeed = async () => {
      const res = await fetch(`${backendUrl}/api/v1/tweets/userFeed`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      if (!data.result) {
        return setErrorMessage(data.message);
      }
      setUserFeed(data.result);
      setErrorMessage("");
    };
    fetchUserFeed();
  }, [rerenderCounter]);

  return (
    <section className="feedpage">
      <HeaderNav />
      <h2>{errorMessage ? errorMessage : ""}</h2>

      {userFeed?.map((singleTweet) => (
        <Tweet singleTweet={singleTweet} key={singleTweet._id} />
      ))}

      <TweetAddButton />
      <FooterNav />
    </section>
  );
};

export default FeedPage;
