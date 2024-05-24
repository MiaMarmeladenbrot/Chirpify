import { useContext, useEffect, useState } from "react";
import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import TweetAddButton from "../../components/TweetAddButton/TweetAddButton";
import { backendUrl } from "../../api/api";
import { accessTokenContext } from "../../context/Context";

// # hier den allUsers-Fetch global?

const FeedPage = () => {
  const [userFeed, setUserFeed] = useState("");
  const { accessToken } = useContext(accessTokenContext);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${backendUrl}/api/v1/tweets/userFeed`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      // if (!data.result) {
      //   return setErrorMessage(data.message);
      // }
      setUserFeed(data);
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <section>
      <HeaderNav />

      <TweetAddButton />
      <FooterNav />
    </section>
  );
};

export default FeedPage;
