import "./SettingsPage.css"
import { useContext } from "react"
import { userContext } from "../../context/Context"
import { Link } from "react-router-dom"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"

const SettingsPage = () => {
  const { user } = useContext(userContext)

  console.log(user)

  return (
    <main className="settings">
      <article className="settings__header">
        <h1>Settings and privacy</h1>
        <div className="settings__header__link">
          <Link to="feed">Done</Link>
        </div>
      </article>
      <article className="settings__container">
        <h2>@{user.username}</h2>
        <div>
          <div className="settings__link-container disabled-link">
            <Link>Account</Link>
            <MdOutlineKeyboardArrowRight />
          </div>
          <div className="settings__link-container">
            <Link to="/settings/emailverification">Email Verification</Link>
            <MdOutlineKeyboardArrowRight />
          </div>
          <div className="settings__link-container disabled-link">
            <Link>Privacy and safety</Link>
            <MdOutlineKeyboardArrowRight />
          </div>
          <div className="settings__link-container disabled-link">
            <Link>Content Preferences</Link>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
      </article>
      <article className="settings__container">
        <h2>General</h2>
        <div>
          <div className="settings__link-container disabled-link">
            <Link>Display and sound</Link>
            <MdOutlineKeyboardArrowRight />
          </div>
          <div className="settings__link-container disabled-link">
            <Link>Data usage</Link>
            <MdOutlineKeyboardArrowRight />
          </div>
          <div className="settings__link-container disabled-link">
            <Link>Accessability</Link>
            <MdOutlineKeyboardArrowRight />
          </div>
          <div className="settings__link-container disabled-link">
            <Link>About Twitter</Link>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
      </article>
      <article className="settings__information">
        <p>General settings affect all of your Twitter accounts on this device.</p>
      </article>
    </main>
  )
}

export default SettingsPage;
