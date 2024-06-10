import "./HeaderNav.css";
import "../../pages/UserPage/UserPage.css";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  rerenderCounterContext,
  userContext,
  userProfileDataContext,
} from "../../context/Context";
import ImageProfile from "../ImageProfile/ImageProfile";
import ImageBird from "../ImageBird/ImageBird";
import { FaArrowLeft } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";

const HeaderNav = () => {
  const { rerenderCounter } = useContext(rerenderCounterContext);
  const { user } = useContext(userContext);
  const { userProfileData } = useContext(userProfileDataContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    if (pathname === `/user/${userProfileData?._id}`) return navigate(-1);

    return navigate("/");
  };

  const refreshFeed = () => {
    navigate("/feed");
    window.scrollTo(0, 0);
  };

  return (
    <header
      // Stylings for Header of logged in user only
      className={
        pathname === `/user/${user?._id}` ? "userpage__header-container" : ""
      }
    >
      <nav
        // separate nav stylings for feed page and all others
        className={
          pathname === "/feed"
            ? "headerNav headerNav-space-between"
            : "headerNav"
        }
      >
        {/* back arrow for login- and register-pages plus userpages of not logged in users */}
        {(pathname === "/register" ||
          pathname === "/login" ||
          pathname === `/user/${userProfileData?._id}`) && (
          <FaArrowLeft className="arrow-position" onClick={goBack} />
        )}

        {/* image of logged-in user shows on user feed in the navigation */}
        {pathname === "/feed" && <ImageProfile user={user} />}

        {/* black header with back arrow and name for logged in user */}
        {pathname === `/user/${user?._id}` && (
          <div>
            <FaArrowLeft
              className="arrow-position userpage__arrow"
              onClick={goBack}
            />
            <p className="userpage__header__name">
              {userProfileData?.firstname} {userProfileData?.lastname}
            </p>
          </div>
        )}

        {/* bird logo for every other user and userfeed plus login- and register-page */}
        {pathname !== `/user/${user?._id || null}` && (
          <div>
            <ImageBird onClick={pathname === "/feed" ? refreshFeed : ""} />
          </div>
        )}

        {/* settings icon for feed page */}
        {pathname === "/feed" && (
          <IoIosSettings
            color="#1D9BF0"
            size={50}
            onClick={() => navigate("/settings")}
          />
        )}
      </nav>
    </header>
  );
};

export default HeaderNav;
