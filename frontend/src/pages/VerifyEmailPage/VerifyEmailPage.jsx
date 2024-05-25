import { useContext, useState } from "react";
import "./VerifyEmailPage.css";
import { accessTokenContext, userContext } from "../../context/Context";
import { backendUrl } from "../../api/api";
import { useNavigate } from "react-router-dom";
import FooterNav from "../../components/FooterNav/FooterNav";

// # Footer aufnehmen

const VerifyEmailPage = () => {
  const { user, setUser } = useContext(userContext);
  const { accessToken } = useContext(accessTokenContext);
  const [sixDigitCode, setSixDigitCode] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/verifyEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ sixDigitCode }),
    });

    const data = await res.json();

    if (!data.result?.isEmailVerified) {
      setError("error");
      setSixDigitCode("");
      return;
    }

    setUser(data.result);
    navigate("/loading");
    setSixDigitCode("");
    setError("");
  };

  const getNewSixDigitCode = async () => {
    const res = await fetch(`${backendUrl}/api/v1/users/sendVerifyEmail`, {
      method: "POST",
      headers: { authorization: `Bearer ${accessToken}` },
    });

    await res.json();

    setDisableButton(true);

    const disableTimeout = setTimeout(() => {
      setDisableButton(false);
    }, 5000);

    return () => clearTimeout(disableTimeout);
  };

  return (
    <main className="verifyemail">
      <h1>Verify your E-Mail</h1>
      <div className="verifyemail__input-container">
        <label htmlFor="sixDigitCode">Enter your 6-Digit-Code here</label>
        <form
          onSubmit={handleSubmit}
          className="verifyemail__input-container__inputs"
        >
          <input
            value={sixDigitCode}
            onChange={(e) => setSixDigitCode(e.target.value)}
            type="text"
            name="sixDigitCode"
            id="sixDigitCode"
            placeholder="675849"
          />
          <button type="submit">Send</button>
        </form>
        {error === "error" && (
          <p className="errorMessage">Wrong 6-Digit-Code. Please Try again</p>
        )}
      </div>

      {user?.isEmailVerified === false && (
        <div className="verifyemail__input__new-email-container">
          <p>
            Don't know your 6-digit code? We'll send you a new code by email.
          </p>
          <button onClick={getNewSixDigitCode}>New 6-Digit-Code</button>
        </div>
      )}
      <FooterNav />
    </main>
  );
};

export default VerifyEmailPage;
