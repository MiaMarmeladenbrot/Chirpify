// Access Token und User.isEmailVerified === true

import { useContext, useState } from "react";
import { userContext } from "../../context/Context";
import VerificationPopup from "../VerificationPopup/VerificationPopup";

const AuthRequiredVerified = ({ children }) => {
  const { user, setUser } = useContext(userContext);
  const [showPopup, setShowPopup] = useState(true);

  return user.isEmailVerified ? (
    children
  ) : (
    <VerificationPopup showPopup={showPopup} setShowPopup={setShowPopup} />
  );
};

export default AuthRequiredVerified;
