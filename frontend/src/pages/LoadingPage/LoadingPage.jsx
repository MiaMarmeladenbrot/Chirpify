import { useContext, useEffect } from "react";
import "./LoadingPage.css";
import { allUsersContext } from "../../context/Context";
import { backendUrl } from "../../api/api";

const LoadingPage = () => {
  const { allUsers, setAllUsers } = useContext(allUsersContext);

  useEffect(() => {
    fetch(`${backendUrl}/api/v1/users`)
      .then((res) => res.json())
      .then((data) => setAllUsers(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(allUsers);

  return (
    <section className="loadingpage">
      <img src="/img/birdLogo.png" alt="" />
    </section>
  );
};

export default LoadingPage;
