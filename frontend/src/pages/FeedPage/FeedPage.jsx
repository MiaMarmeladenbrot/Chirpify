import { useContext } from "react";
import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import TweetAddButton from "../../components/TweetAddButton/TweetAddButton";
import { errorMessageContext, userFeedContext } from "../../context/Context";
import "./FeedPage.css";
import Tweet from "../../components/Tweet/Tweet";

const FeedPage = () => {
  const { userFeed } = useContext(userFeedContext);
  const { errorMessage } = useContext(errorMessageContext);

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
