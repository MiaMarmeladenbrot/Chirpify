import HeaderNav from "../../components/HeaderNav/HeaderNav";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <HeaderNav />
      <main className="landingPage">
        <div>
          <h1>Welcome to Chirpify</h1>
          <h2>Find out what's going on in the world right now.</h2>
        </div>
        <div>
          <div className="landingPage__link">
            <Link to="/register">Create account</Link>
          </div>
          <p className="landingPage__terms">
            By signing up, you agree to our Terms, Privacy Policy and Cookie
            Use.
          </p>
        </div>
        <div className="landingPage__Login-Container">
          <p>Have an account already?</p>
          <div className="landingPage__link--login">
            <Link to="/login">Log in</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
