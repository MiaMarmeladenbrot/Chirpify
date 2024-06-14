import { useContext, useState } from "react";
import { backendUrl } from "../../api/api";
import {
  accessTokenContext,
  rerenderCounterContext,
} from "../../context/Context";
import "./IconDelete.css";
import AuthRequiredVerified from "../AuthRequiredVerified/AuthRequiredVerified";

const IconDelete = ({ singleTweet, singleComment, setErrorMessage }) => {
  const { accessToken } = useContext(accessTokenContext);
  const { rerenderCounter, setRerenderCounter } = useContext(
    rerenderCounterContext
  );
  const [showDelete, setShowDelete] = useState(false);

  const deleteTweetOrComment = async () => {
    const res = singleTweet
      ? await fetch(`${backendUrl}/api/v1/tweets/${singleTweet._id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })
      : await fetch(`${backendUrl}/api/v1/comments/${singleComment._id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });

    const data = await res.json();
    if (!data.result) {
      return setErrorMessage(data.message || "Could not delete anything.");
    }
    setRerenderCounter(rerenderCounter + 1);
    setShowDelete(false);
    setErrorMessage("");
  };

  console.log(showDelete);

  return (
    <div>
      {/* trash can icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        width={15}
        fill="#687684"
        onClick={() => setShowDelete(true)}
      >
        <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
      </svg>

      {showDelete && (
        <AuthRequiredVerified setShowDelete={setShowDelete}>
          <section className="delete-tweet-popup">
            <img src="/img/birdLogo.png" alt="bird logo" />
            <p>Are you sure you want to delete this?</p>

            {/* check-icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width={18}
              fill="#4C9BF0"
              onClick={deleteTweetOrComment}
            >
              <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
            </svg>

            {/* x-icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={20}
              fill="#ce395f"
              onClick={() => setShowDelete(false)}
            >
              <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
            </svg>
          </section>
        </AuthRequiredVerified>
      )}
    </div>
  );
};

export default IconDelete;
