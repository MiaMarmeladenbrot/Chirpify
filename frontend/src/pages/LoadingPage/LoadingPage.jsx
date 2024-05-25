import { useContext, useEffect, useState } from "react";
import "./LoadingPage.css";
import { allUsersContext, userContext } from "../../context/Context";
import { backendUrl } from "../../api/api";
import GetFetches from "../../components/GetFetches/GetFetches";

const LoadingPage = () => {
  // const { user, setUser } = useContext(userContext);
  // const { allUsers, setAllUsers } = useContext(allUsersContext);
  // const {}

  // useEffect(() => {
  //   fetch(`${backendUrl}/api/v1/users`)
  //     .then((res) => res.json())
  //     .then((data) => setAllUsers(data))
  //     .catch((err) => console.log(err));
  // }, []);
  // console.log(allUsers);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  }, []);

  return (
    <section className="loadingpage">
      <img src="/img/birdLogo.png" alt="bird logo" />
      <GetFetches loading={loading} />
    </section>
  );
};

export default LoadingPage;
