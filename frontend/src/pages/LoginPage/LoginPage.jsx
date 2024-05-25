import "./LoginPage.css";
import { useContext, useState } from "react";
import { backendUrl } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { accessTokenContext, userContext } from "../../context/Context";
import HeaderNav from "../../components/HeaderNav/HeaderNav";

const LoginPage = () => {
  const [email, setEmail] = useState("mia.mecklenburg@gmx.net");
  const [password, setPassword] = useState("mia123");
  const { setUser } = useContext(userContext);
  const { setAccesToken } = useContext(accessTokenContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    setUser(data.result.user);

    setAccesToken(data.result.tokens.accessToken);

    // if (
    //   data.result.user.isEmailVerified === false &&
    //   data.result.tokens.accessToken
    // ) {
    // return navigate("/settings/emailverification");
    // }

    // navigate("/feed");
    navigate("/loading");
    setEmail("");
    setPassword("");
  };

  return (
    <section className="loginpage">
      <HeaderNav />
      <h1>Login to your account</h1>
      <form onSubmit={handleSubmit} className="login-register-form">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </section>
  );
};

export default LoginPage;
