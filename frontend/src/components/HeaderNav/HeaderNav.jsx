import "./HeaderNav.css";
import { useLocation, useNavigate } from "react-router-dom";
import ImageBird from "../ImageBird/ImageBird";
import { FaArrowLeft } from "react-icons/fa6";

// Nav to Profil
// Nav to Settings
// Bird to Feed Top of the Page
// ! Conditional Rendering depending on the location
// ! CSS muss wahrscheinlich auch Conditional für headerNav je nach Componentent

const HeaderNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    return navigate("/landing");
  };

  return (
    <header>
      <nav className="headerNav">
        {/* navigate to landingpage */}
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
