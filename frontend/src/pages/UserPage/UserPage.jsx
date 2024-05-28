import "./UserPage.css";
import { useContext, useEffect, useState } from "react";
import { accessTokenContext, userProfileDataContext } from "../../context/Context";
import { useParams } from "react-router-dom";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { backendUrl } from "../../api/api";
import { IoIosLink } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

const UserPage = () => {
  const { accessToken } = useContext(accessTokenContext);
  const { userProfileData, setUserProfileData } = useContext(userProfileDataContext);
  const { userId } = useParams();
  const [followers, setFollowers] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");

  // console.log({ firstname, lastname, username, description, website });

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

  // Edit User Information
  const openCloseForm = () => {
    setOpenForm(true);
    setFirstname(userProfileData?.firstname);
    setLastname(userProfileData?.lastname);
    setUsername(userProfileData?.username);
    setDescription(userProfileData?.description);
    setWebsite(userProfileData?.website || "Enter Website");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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

        {/* Unser Information */}
        {!openForm && (
          <div className="userpage__profile-content-container">
            <p className="userpage__username-bold">{userProfileData?.username}</p>
            <p className="userpage__username">@{userProfileData?.username}</p>
            <p className="userpage__description">{userProfileData?.description}</p>
            <div onClick={openCloseForm} className="userpage__modify-icons-container">
              <FaRegEdit className="userpage__modify-icon" />
            </div>
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
        )}

        {/* Update User Information */}
        {openForm && (
          <>
            <h2 className="userpage__heading_edit">Update your Data</h2>
            <form className="userpage__form" onSubmit={handleSubmit}>
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                type="text"
                placeholder="Firstname"
              />
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
                placeholder="Lastname"
              />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="username"
              />
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="description"
              />
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                type="text"
                placeholder="website"
              />
              <div className="userpage__form__button-container">
                <button className="userpage__button--grey">Cancel</button>
                <button type="submit">Save</button>
              </div>
            </form>
          </>
        )}
      </main>
    </>
  );
};

export default UserPage;
