import { useEffect, useState } from "react";
import "./LoadingPage.css";

import GetFetches from "../../components/GetFetches/GetFetches";

const LoadingPage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, []);

  return (
    <section className="loadingpage">
      <img src="/img/birdLogo.png" alt="bird logo" />
      <GetFetches loading={loading} />
    </section>
  );
};

export default LoadingPage;
