import { useNavigate } from "react-router-dom";
import "./TweetAddButton.css";
const TweetAddButton = () => {
  const navigate = useNavigate();
  return (
    <div className="tweet-add-button-container">
      <img
        src="/img/addTweetIcon.png"
        alt="blue icon to add a tweet"
        onClick={() => navigate("/addtweet")}
      />
    </div>
  );
};

export default TweetAddButton;
