import { useContext, useEffect, useState } from "react";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import "./UserPage.css";
import { accessTokenContext, userContext } from "../../context/Context";
import { backendUrl } from "../../api/api";
import { IoIosLink } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";

const UserPage = () => {
  const { user } = useContext(userContext);
  const { accessToken } = useContext(accessTokenContext);
  const [followers, setFollowers] = useState("");
  // console.log(user);
  // console.log(accessToken);
  console.log(followers);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/users/followers`, {
        method: "GET",
        headers: { authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      setFollowers(data);
    };

    fetchData();
  }, []);

  const joinedDate = new Date(user.createdAt);
  const joinedMonth = joinedDate.toLocaleDateString("de-DE", { month: "short" });
  const joinedYear = joinedDate.getFullYear();

  return (
    <>
      <HeaderNav />
      <main>
        <div className="userpage__profile-image">
          <img src={`${backendUrl}/${user?.profileImg}`} alt="Profile Image" />
        </div>
        <div className="userpage__profile-content-container">
          <p className="userpage__username-bold">{user.username}</p>
          <p className="userpage__username">@{user.username}</p>
          <p className="userpage__description">{user.description}</p>
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
                <span>{user?.isFollowerOf?.length} </span>Following
              </p>
              <p>
                <span>{followers?.result?.length} </span>Followers
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
