// For Header Nav ✅
// For User Page Top
// For Feed (All and User Feed) => for every own tweet

import { useNavigate } from "react-router-dom";
import "./ImageProfile.css";
import { useContext } from "react";
import { userContext } from "../../context/Context";
import { backendUrl } from "../../api/api";

const ImageProfile = () => {
  const { user } = useContext(userContext);

  const navigate = useNavigate();
  return (
    <div className="profile-img">
      {/* <img
        src="/img/placeholder-profileImg.png"
        alt="profile image of user"
        onClick={() => navigate(`/user/${user._id}`)}
      /> */}

      <img
        src={`${backendUrl}/${user.profileImg}`}
        alt={`Profile image of ${user.username}`}
        onClick={() => navigate(`/user/${user._id}`)}
      />
    </div>
  );
};

export default ImageProfile;
