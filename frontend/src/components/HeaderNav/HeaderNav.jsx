import "./HeaderNav.css";
import { useLocation, useNavigate } from "react-router-dom";
import ImageBird from "../ImageBird/ImageBird";
import { FaArrowLeft } from "react-icons/fa6";
import ImageProfile from "../ImageProfile/ImageProfile";
import { IoIosSettings } from "react-icons/io";

const HeaderNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    return navigate("/landing");
  };

  const refreshFeed = () => {
    navigate("/feed");
    window.scrollTo(0, 0);
  };

  return (
    <header>
      <nav className={pathname === "/feed" ? "headerNav-big" : "headerNav"}>
        {pathname === "/register" && (
          <FaArrowLeft className="arrow-position" onClick={goBack} />
        )}
        {pathname === "/login" && (
          <FaArrowLeft className="arrow-position" onClick={goBack} />
        )}
        {pathname === "/feed" && <ImageProfile />}
        <ImageBird onClick={pathname === "/feed" ? refreshFeed : ""} />
        {pathname === "/feed" && (
          <IoIosSettings
            color="#1D9BF0"
            size={60}
            onClick={() => navigate("/settings")}
          />
        )}
      </nav>
    </header>
  );
};

export default HeaderNav;
