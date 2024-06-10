import { useNavigate } from "react-router-dom";
import "./ImageProfile.css";
import { backendUrl } from "../../api/api";

const ImageProfile = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="profile-img">
      <img
        src={`${backendUrl}/${user?.profileImg}`}
        alt={`Profile image of ${user?.username}`}
        onClick={() => navigate(`/user/${user?._id}`)}
      />
    </div>
  );
};

export default ImageProfile;
