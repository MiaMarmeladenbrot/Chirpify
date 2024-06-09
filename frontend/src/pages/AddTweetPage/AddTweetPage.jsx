import "./AddTweetPage.css";
import ImageProfile from "../../components/ImageProfile/ImageProfile";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../api/api";
import {
  accessTokenContext,
  rerenderCounterContext,
} from "../../context/Context";
import FooterNav from "../../components/FooterNav/FooterNav";
import RetweetedTweet from "../../components/RetweetedTweet/RetweetedTweet";

const AddTweetPage = () => {
  const { accessToken } = useContext(accessTokenContext);
  const { rerenderCounter, setRerenderCounter } = useContext(
    rerenderCounterContext
  );

  // authenticatedUserId, { message, retweetedTweetId, isLikedBy } => message aus textarea, retweetedTweetId aus navigate/location bei Klick auf retweet, isLikedBy kommt erst später dazu über die Like-Funktion
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const retweetedTweetId = location.state?.retweetedTweetId;
  const [retweetedTweet, setRetweetedTweet] = useState([]);

  const navigate = useNavigate();

  const addImgToTweet = () => {
    //! wenn multer implementiert ist, hier Fotos zum Tweet hinzufügen
  };

  const postNewTweet = async (e) => {
    e.preventDefault();

    if (message.length > 160)
      return setErrorMessage(
        "We know you have a lot to say, but unfortunately your tweet cannot exceed 160 characters."
      );

    const res = await fetch(`${backendUrl}/api/v1/tweets`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, retweetedTweetId }),
    });

    const data = await res.json();
    if (!data.result) setErrorMessage(data.message);
    setRerenderCounter(rerenderCounter + 1);
    setErrorMessage("");
    navigate("/feed");
  };

  // get information of retweeted Tweet, if there is one, to display underneath the textarea-field for the new tweet
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${backendUrl}/api/v1/tweets/${retweetedTweetId}`,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );

      const data = await res.json();

      setRetweetedTweet(data.result);
    };

    fetchData();
  }, [rerenderCounter]);

  return (
    <section className="add-tweet-page">
      <div>
        <Link to="/feed">Cancel</Link>
        <button onClick={postNewTweet}>Tweet</button>
      </div>

      {errorMessage && <p className="errorMessage">{errorMessage}</p>}

      <div>
        <article>
          <ImageProfile />
          <img onClick={addImgToTweet} src="/img/Camera.png" alt="" />
        </article>
        <textarea
          name="tweet-content"
          id="tweet-content"
          placeholder="What's happening?"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></textarea>
      </div>

      {/* show retweet, if there is one */}
      {retweetedTweet && (
        <section>
          <h3>You're retweeting this:</h3>
          <RetweetedTweet retweetedTweet={retweetedTweet} />
        </section>
      )}

      <FooterNav />
    </section>
  );
};

export default AddTweetPage;
