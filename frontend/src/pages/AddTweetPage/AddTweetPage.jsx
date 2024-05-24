import "./AddTweetPage.css";
import ImageProfile from "../../components/ImageProfile/ImageProfile";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { backendUrl } from "../../api/api";
import { accessTokenContext } from "../../context/Context";
import FooterNav from "../../components/FooterNav/FooterNav";

const AddTweetPage = (retweetedTweetId) => {
  const { accessToken, setAccessToken } = useContext(accessTokenContext);

  // authenticatedUserId, { message, retweetedTweetId, isLikedBy }
  // message aus textarea, retweetedTweetId aus props bei Klick auf retweet, isLikedBy kommt erst später dazu über die Like-Funktion
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const addImgToTweet = () => {
    //! wenn multer implementiert ist, hier Fotos zum Tweet hinzufügen
  };

  const postNewTweet = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/tweets`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    console.log({ data });
    if (!data.result) setErrorMessage(data.message);

    navigate("/feed");
  };

  return (
    <section className="add-tweet-page">
      <div>
        <Link onClick={() => navigate(-1)}>Cancel</Link>
        <button onClick={postNewTweet}>Tweet</button>
      </div>

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
      <FooterNav />
    </section>
  );
};

export default AddTweetPage;
