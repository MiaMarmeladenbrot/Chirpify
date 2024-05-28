import "./HeaderNav.css";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userContext, userProfileDataContext } from "../../context/Context";
import ImageProfile from "../ImageProfile/ImageProfile";
import ImageBird from "../ImageBird/ImageBird";
import { FaArrowLeft } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";

const HeaderNav = () => {
  const { user } = useContext(userContext);
  const { userProfileData } = useContext(userProfileDataContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    return navigate("/");
  };

  const refreshFeed = () => {
    navigate("/feed");
    window.scrollTo(0, 0);
  };

  return (
    <header
      className={pathname === `/user/${userProfileData?._id}` ? "userpage__header-container" : ""}>
      <nav className={pathname === "/feed" ? "headerNav-big" : "headerNav"}>
        {pathname === "/register" && <FaArrowLeft className="arrow-position" onClick={goBack} />}

        {pathname === "/login" && <FaArrowLeft className="arrow-position" onClick={goBack} />}

        {pathname === "/feed" && <ImageProfile />}

        {pathname === `/user/${userProfileData?._id}` && (

          <div>
            <FaArrowLeft className="arrow-position userpage__arrow" onClick={goBack} />
            <p className="userpage__header__name">
              {userProfileData?.firstname} {userProfileData?.lastname}
            </p>
          </div>
        )}

        {pathname !== `/user/${userProfileData?._id || null}` && (
          <ImageBird onClick={pathname === "/feed" ? refreshFeed : ""} />
        )}

        {pathname === "/feed" && (
          <IoIosSettings color="#1D9BF0" size={50} onClick={() => navigate("/settings")} />
        )}
      </nav>
    </header>
  );
};

export default HeaderNav;
