import "./UserPage.css";
import { useContext, useEffect, useState } from "react";
import {
  accessTokenContext,
  rerenderCounterContext,
  userContext,
  userProfileDataContext,
} from "../../context/Context";
import { useParams } from "react-router-dom";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { backendUrl } from "../../api/api";
import { IoIosLink } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import Tweet from "../../components/Tweet/Tweet";
import FooterNav from "../../components/FooterNav/FooterNav";
import ImageProfile from "../../components/ImageProfile/ImageProfile";

const UserPage = () => {
  const { accessToken } = useContext(accessTokenContext);
  const { userProfileData, setUserProfileData } = useContext(
    userProfileDataContext
  );
  const { user } = useContext(userContext);
  const { rerenderCounter, setRerenderCounter } = useContext(
    rerenderCounterContext
  );
  const [userTweets, setUserTweets] = useState([]);
  const [followers, setFollowers] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [profileImageFile, setProfileImageFile] = useState("");
  const { userId } = useParams();

  // Get Tweets of the User
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/tweets/of/${userId}`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();

      setUserTweets(data.result);
    };

    fetchData();
  }, [rerenderCounter, userId, rerenderCounter]);

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
  }, [openForm, userId, rerenderCounter]);

  // Get Followers of Specific User
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${backendUrl}/api/v1/users/followers/${userId}`,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );

      const data = await res.json();
      setFollowers(data?.result);
    };

    fetchData();
  }, [userId]);

  // Open Form to edit User Informationen
  const openCloseForm = (e) => {
    e.preventDefault();
    setOpenForm(!openForm);
    setFirstname(userProfileData?.firstname);
    setLastname(userProfileData?.lastname);
    setUsername(userProfileData?.username);
    setDescription(userProfileData?.description);
    setWebsite(userProfileData?.website || "Enter Website");
  };

  // Edit User Information
  const handleSubmit = async (e) => {
    e.preventDefault();

    let profileImgName = "";
    if (profileImageFile) {
      const formData = new FormData();
      formData.append("profileImage", profileImageFile, profileImageFile.name);

      const resImg = await fetch(`${backendUrl}/api/v1/files/upload`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      const dataImg = await resImg.json();
      profileImgName = dataImg.imgName;
    } else {
      profileImgName = user.profileImg;
    }

    const res = await fetch(`${backendUrl}/api/v1/users/edit/${userId}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        description,
        website,
        profileImg: profileImgName,
      }),
    });

    const data = await res.json();

    setUserProfileData(data?.result);

    setRerenderCounter(rerenderCounter + 1);
    setOpenForm(false);
    setFirstname("");
    setLastname("");
    setUsername("");
    setDescription("");
    setWebsite("");
  };

  const joinedDate = new Date(userProfileData?.createdAt);
  const joinedMonth = joinedDate.toLocaleDateString("de-DE", {
    month: "short",
  });
  const joinedYear = joinedDate.getFullYear();

  return (
    <>
      <HeaderNav />
      <main>
        <div className="userpage__profile-image">
          <ImageProfile user={userProfileData} />
        </div>

        {/* User Information */}
        {!openForm && (
          <div className="userpage__profile-content-container">
            <p className="userpage__username-bold">
              {userProfileData?.username}
            </p>
            <p className="userpage__username">@{userProfileData?.username}</p>
            <p className="userpage__description">
              {userProfileData?.description}
            </p>

            {userId === user._id && (
              <div
                onClick={openCloseForm}
                className="userpage__modify-icons-container"
              >
                <FaRegEdit className="userpage__modify-icon" />
              </div>
            )}

            <div className="userpage__bottom-container">
              <div>
                <IoIosLink />
                <a href={userProfileData?.website} target="_blank">
                  Website
                </a>
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
                  <span>{userProfileData?.isFollowerOf?.length || 0} </span>
                  Following
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
            <form className="userpage__form">
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
              <input
                type="file"
                onChange={(e) => setProfileImageFile(e.target.files[0])}
              />
              <div className="userpage__form__button-container">
                <button
                  className="userpage__button--grey"
                  onClick={openCloseForm}
                >
                  Cancel
                </button>
                <button onClick={handleSubmit}>Save</button>
              </div>
            </form>
          </>
        )}

        <section className="userpage__userFeed-container">
          {userTweets?.map((singleTweet) => (
            <Tweet singleTweet={singleTweet} key={singleTweet._id} />
          ))}
        </section>
      </main>
      <FooterNav />
    </>
  );
};

export default UserPage;
