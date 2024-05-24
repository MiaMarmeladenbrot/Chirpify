import "./HeaderNav.css";
import { useLocation, useNavigate } from "react-router-dom";
import ImageBird from "../ImageBird/ImageBird";
import { FaArrowLeft } from "react-icons/fa6";

const HeaderNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    return navigate("/landing");
  };

  return (
    <header>
      <nav className="headerNav">
        {pathname === "/register" && (
          <FaArrowLeft className="arrow-position" onClick={goBack} />
        )}
        {pathname === "/login" && (
          <FaArrowLeft className="arrow-position" onClick={goBack} />
        )}
        <ImageBird />
      </nav>
    </header>
  );
};

export default HeaderNav;
