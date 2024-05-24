import ImageAlert from "../ImageAlert/ImageAlert";
import ImageHome from "../ImageHome/ImageHome";
import ImageMessage from "../ImageMessage/ImageMessage";
import ImageSearch from "../ImageSearch/ImageSearch";
import "./FooterNav.css";
import { NavLink } from "react-router-dom";

const FooterNav = () => {
  return (
    <footer>
      <nav>
        <NavLink to="/feed">
          <ImageHome />
        </NavLink>

        <NavLink to="/search">
          <ImageSearch />
        </NavLink>

        <NavLink to="/alert">
          <ImageAlert />
        </NavLink>

        <NavLink to="/messages">
          <ImageMessage />
        </NavLink>
      </nav>
    </footer>
  );
};

export default FooterNav;
