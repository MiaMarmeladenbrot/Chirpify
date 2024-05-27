import "./HeaderNav.css";
import { useLocation, useNavigate } from "react-router-dom";
import ImageBird from "../ImageBird/ImageBird";
import { FaArrowLeft } from "react-icons/fa6";
import ImageProfile from "../ImageProfile/ImageProfile";
import { IoIosSettings } from "react-icons/io";
import { useContext } from "react";
import { userContext } from "../../context/Context";

const HeaderNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(userContext);

  const goBack = () => {
    return navigate("/");
  };

  const refreshFeed = () => {
    navigate("/feed");
    window.scrollTo(0, 0);
  };

  return (
    <header className={pathname === `/user/${user?._id}` ? "userpage__header-container" : ""}>
      <nav className={pathname === "/feed" ? "headerNav-big" : "headerNav"}>
        {pathname === "/register" && <FaArrowLeft className="arrow-position" onClick={goBack} />}

        {pathname === "/login" && <FaArrowLeft className="arrow-position" onClick={goBack} />}

        {pathname === "/feed" && <ImageProfile />}

        {pathname === `/user/${user?._id}` && (
          <div>
            <FaArrowLeft className="arrow-position userpage__arrow" onClick={goBack} />
            <p className="userpage__header__name">
              {user?.firstname} {user?.lastname}
            </p>
          </div>
        )}

        {pathname !== `/user/${user?._id || null}` && (
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
