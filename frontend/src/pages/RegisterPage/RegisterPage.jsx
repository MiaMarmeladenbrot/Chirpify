import { useContext, useState } from "react";
import "./RegisterPage.css";
import { backendUrl } from "../../api/api";
import { userContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import VerificationPopup from "../../components/VerificationPopup/VerificationPopup";

// .post("/register", UserController.postRegisterUserCtrl)

const RegisterPage = () => {
  const { user, setUser } = useContext(userContext);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const [inputType, setInputType] = useState("password");

  const handlePasswordVisibility = () => {
    if (inputType === "password") {
      setInputType("text");
    } else if (inputType === "text") {
      setInputType("password");
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !username || !email || !password)
      return setErrorMessage("All fields must be filled");

    const res = await fetch(`${backendUrl}/api/v1/users/register`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ firstname, lastname, username, email, password }),
    });

    const data = await res.json();
    console.log({ data });
    if (!data.result)
      return setErrorMessage(data.message || "Failed to register");
    console.log(errorMessage);

    const userData = data.result;
    setUser(userData);
    console.log({ userData });
    setErrorMessage("");
    navigate(`/login`);
  };

  return (
    <section className="registerpage">
      <VerificationPopup />
      <HeaderNav />
      <h1>Create your account</h1>

      <form className="login-register-form">
        <input
          type="text"
          placeholder="Firstname"
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
        />
        <input
          type="text"
          placeholder="Lastname"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
        <button onClick={registerUser}>Sign up</button>
        {errorMessage ? <p className="errorMessage">{errorMessage}</p> : ""}
      </form>
    </section>
  );
};

export default RegisterPage;
