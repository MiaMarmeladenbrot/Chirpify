import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import "./VerificationPopup.css";
import { useState } from "react";
// { showPopup, setShowPopup }
const VerificationPopup = ({ showPopup, setShowPopup }) => {
  // const [showPopup, setShowPopup] = useState(false);
  const hidePopup = () => {
    return setShowPopup(false);
  };

  console.log(showPopup);
  return (
    <section className="verification-popup">
      <div>
        <h2>Welcome!</h2>
        <p>
          You can already have a look around, but if you want to participate,
          you have to first verify your email.
        </p>
        <Link to="/settings/emailverification" onClick={hidePopup}>
          Verify my email
        </Link>
        <IoMdClose className="position-closing-icon" onClick={hidePopup} />
      </div>
    </section>
  );
};

export default VerificationPopup;
