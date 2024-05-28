import "./UserPage.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../../api/api";
import { IoIosLink } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { accessTokenContext, userProfileDataContext } from "../../context/Context";
import HeaderNav from "../../components/HeaderNav/HeaderNav";

const UserPage = () => {
  const { accessToken } = useContext(accessTokenContext);
  const { userProfileData, setUserProfileData } = useContext(userProfileDataContext);
  const { userId } = useParams();
  const [followers, setFollowers] = useState("");

  // Get User Information
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/users/${userId}`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();

      setUserProfileData(data?.result);
    };

    fetchData();
  }, []);

  // Get Followers of Specific User
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/users/followers/${userId}`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      setFollowers(data?.result);
    };

    fetchData();
  }, []);

  const joinedDate = new Date(userProfileData?.createdAt);
  const joinedMonth = joinedDate.toLocaleDateString("de-DE", { month: "short" });
  const joinedYear = joinedDate.getFullYear();

  return (
    <>
      <HeaderNav />
      <main>
        <div className="userpage__profile-image">
          <img src={`${backendUrl}/${userProfileData?.profileImg}`} alt="Profile Image" />
        </div>
        <div className="userpage__profile-content-container">
          <p className="userpage__username-bold">{userProfileData?.username}</p>
          <p className="userpage__username">@{userProfileData?.username}</p>
          <p className="userpage__description">{userProfileData?.description}</p>
          <div className="userpage__bottom-container">
            <div>
              <IoIosLink />
              <a href="https://www.google.de">Website</a>
            </div>
            <div>
              <FaRegCalendarAlt />
              <p>
                Joined {joinedMonth} {joinedYear}
              </p>
            </div>
          </div>
          <div className="userpage__follow-container">
            <div>
              <p>
                <span>{userProfileData?.isFollowerOf?.length || 0} </span>Following
              </p>
              <p>
                <span>{followers?.length || 0} </span>Followers
              </p>
            </div>
            <div></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserPage;
