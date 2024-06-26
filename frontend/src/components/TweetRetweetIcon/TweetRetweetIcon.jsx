// Redirect to AddTweetPage with TweetId

import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AddTweetPage from "../../pages/AddTweetPage/AddTweetPage";
import { userContext } from "../../context/Context";
import AuthRequiredVerified from "../AuthRequiredVerified/AuthRequiredVerified";

const TweetRetweetIcon = ({ retweetedTweetId }) => {
  // falls Email verifiziert: bei Klick Weiterleitung an /addtweet oder <AddTweetPage/> mit singleTweet._id als Props
  // falls Email noch nicht verifiziert: VerificationPopup zeigen bzw. AuthRequiredVerified aufrufen

  const [navigateTo, setNavigateTo] = useState(false);
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="14"
        viewBox="0 0 19 14"
        fill="none"
        onClick={() => setNavigateTo(true)}
      >
        <path
          d="M4.35355 0.969689C4.15829 0.774427 3.84171 0.774427 3.64645 0.969689L1.05806 3.55808C0.813981 3.80216 0.813981 4.19788 1.05806 4.44196C1.30214 4.68604 1.69786 4.68604 1.94194 4.44196L3.375 3.0089V10.5C3.375 12.2259 4.77411 13.625 6.5 13.625H10.5C10.8452 13.625 11.125 13.3452 11.125 13C11.125 12.6548 10.8452 12.375 10.5 12.375H6.5C5.46447 12.375 4.625 11.5356 4.625 10.5V3.0089L6.05806 4.44196C6.30214 4.68604 6.69786 4.68604 6.94194 4.44196C7.18602 4.19788 7.18602 3.80216 6.94194 3.55808L4.35355 0.969689Z"
          fill="#687684"
        />
        <path
          d="M15.2714 13.6553C15.4667 13.8506 15.7833 13.8506 15.9786 13.6553L18.5669 11.0669C18.811 10.8228 18.811 10.4271 18.5669 10.183C18.3229 9.93896 17.9271 9.93896 17.6831 10.183L16.25 11.6161V4.12498C16.25 2.39909 14.8509 0.999981 13.125 0.999981H9.125C8.77982 0.999981 8.5 1.2798 8.5 1.62498C8.5 1.97016 8.77982 2.24998 9.125 2.24998H13.125C14.1605 2.24998 15 3.08945 15 4.12498V11.6161L13.5669 10.183C13.3229 9.93896 12.9271 9.93896 12.6831 10.183C12.439 10.4271 12.439 10.8228 12.6831 11.0669L15.2714 13.6553Z"
          fill="#687684"
        />

        {navigateTo && (
          <Navigate
            to="/addtweet"
            state={{ retweetedTweetId }}
            replace={true}
          />
        )}
      </svg>
    </div>
  );
};

export default TweetRetweetIcon;
