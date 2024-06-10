import "./LoginPage.css";
import { useContext, useState } from "react";
import { backendUrl } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { accessTokenContext, userContext } from "../../context/Context";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { FaEye } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("mia.mecklenburg@gmx.net");
  const [password, setPassword] = useState("mia123");
  const { setUser } = useContext(userContext);
  const { setAccesToken } = useContext(accessTokenContext);
  const navigate = useNavigate();

  const [inputType, setInputType] = useState("password");

  const handlePasswordVisibility = () => {
    if (inputType === "password") {
      setInputType("text");
    } else if (inputType === "text") {
      setInputType("password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    setUser(data.result.user);

    setAccesToken(data.result.tokens.accessToken);

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

        <div>
          <input
            type={inputType}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <FaEye onClick={handlePasswordVisibility} className="eye" />
        </div>
        <button type="submit">Log in</button>
      </form>
      <p>
        Don't have an account yet? <Link to="/register">Register here</Link>
      </p>
    </section>
  );
};

export default LoginPage;
