import { useContext, useEffect } from "react";
import {
  accessTokenContext,
  allUsersContext,
  errorMessageContext,
  userContext,
} from "../../context/Context";
import { backendUrl } from "../../api/api";
import { useNavigate } from "react-router-dom";

const GetFetches = ({ loading }) => {
  const { user } = useContext(userContext);
  const { accessToken } = useContext(accessTokenContext);
  const { setAllUsers } = useContext(allUsersContext);
  const { setErrorMessage } = useContext(errorMessageContext);

  const navigate = useNavigate();

  useEffect(() => {
    // fetch for all users
    const fetchAllUsers = async () => {
      const res = await fetch(`${backendUrl}/api/v1/users`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      if (!data.result) {
        return setErrorMessage(data.message);
      }
      setAllUsers(data.result);
      setErrorMessage("");
    };
    fetchAllUsers();

    // Weiterleitung je nach Verifizierungsstatus der Email des Users:
    if (user.isEmailVerified === false && accessToken && loading) {
      return navigate("/settings/emailverification");
    } else if (user.isEmailVerified && accessToken && loading) {
      return navigate("/feed");
    }
  }, [loading]);

  return;
};

export default GetFetches;
