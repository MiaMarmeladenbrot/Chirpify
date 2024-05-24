// Access Token und User.isEmailVerified === true

import { useContext } from "react";
import { userContext } from "../../context/Context";
import { Navigate } from "react-router-dom";
import VerificationPopup from "../VerificationPopup/VerificationPopup";

const AuthRequiredVerified = ({ children }) => {
  const { user, setUser } = useContext(userContext);
  console.log(user);

  return user.isEmailVerified ? (
    children
  ) : (
    // <Navigate to="/settings/emailverification" />
    <VerificationPopup />
  );
};

export default AuthRequiredVerified;
