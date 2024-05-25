import { useContext, useEffect } from "react";
import {
  accessTokenContext,
  allUsersContext,
  errorMessageContext,
  userContext,
  userFeedContext,
} from "../../context/Context";
import { backendUrl } from "../../api/api";
import { useNavigate } from "react-router-dom";

const GetFetches = ({ loading }) => {
  const { user } = useContext(userContext);
  const { accessToken } = useContext(accessTokenContext);
  const { allUsers, setAllUsers } = useContext(allUsersContext);
  const { errorMessage, setErrorMessage } = useContext(errorMessageContext);
  const { userFeed, setUserFeed } = useContext(userFeedContext);

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

    // fetch for userFeed
    const fetchUserFeed = async () => {
      const res = await fetch(`${backendUrl}/api/v1/tweets/userFeed`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      if (!data.result) {
        return setErrorMessage(data.message);
      }
      setUserFeed(data.result);
      setErrorMessage("");
    };
    fetchUserFeed();

    // Weiterleitung je nach Verifizierungsstatus der Email des Users:
    if (user.isEmailVerified === false && accessToken && loading) {
      return navigate("/settings/emailverification");
    } else if (user.isEmailVerified && accessToken && loading) {
      return navigate("/feed");
    }
  }, [loading]);
  console.log(allUsers);
  console.log(userFeed);
  console.log(loading);

  return;
};

export default GetFetches;
