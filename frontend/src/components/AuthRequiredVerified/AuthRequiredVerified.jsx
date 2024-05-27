import { useContext, useState } from "react";
import { userContext } from "../../context/Context";
import VerificationPopup from "../VerificationPopup/VerificationPopup";
import { Navigate, useNavigate } from "react-router-dom";

const AuthRequiredVerified = ({ children }) => {
  const { user, setUser } = useContext(userContext);
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div>
      {user && user.isEmailVerified && children}
      {user && user.isEmailVerified === false && (
        <VerificationPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
      {!user && <Navigate to="/login" />}
    </div>
  );
};

export default AuthRequiredVerified;
