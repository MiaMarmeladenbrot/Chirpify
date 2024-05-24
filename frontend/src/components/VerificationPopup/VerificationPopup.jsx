import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import "./VerificationPopup.css";

const VerificationPopup = ({ showPopup, setShowPopup }) => {
  const navigate = useNavigate();
  const hidePopupAndMove = () => {
    setShowPopup(false);
    navigate("/feed");
  };

  return (
    <>
      {showPopup ? (
        <section className="verification-popup">
          <div>
            <h2>Welcome!</h2>
            <p>
              You can already have a look around, but if you want to
              participate, you have to first verify your email.
            </p>
            <Link
              to="/settings/emailverification"
              onClick={() => setShowPopup(false)}
            >
              Verify my email
            </Link>
            <IoMdClose
              className="position-closing-icon"
              onClick={hidePopupAndMove}
            />
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default VerificationPopup;
