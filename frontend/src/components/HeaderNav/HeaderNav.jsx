import "./HeaderNav.css"
import { useLocation } from "react-router-dom"
import ImageBird from "../ImageBird/ImageBird"
import { FaArrowLeft } from "react-icons/fa6"

// Nav to Profil
// Nav to Settings
// Bird to Feed Top of the Page
// ! Conditional Rendering depending on the location
// ! CSS muss wahrscheinlich auch Conditional für headerNav je nach Componentent

const HeaderNav = () => {
  const { pathname } = useLocation()

  return (
    <header>
      <nav className="headerNav">
        {pathname === "/register" && <FaArrowLeft />}
        <ImageBird />
      </nav>
    </header>
  )
}

export default HeaderNav
