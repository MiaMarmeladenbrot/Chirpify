import { useContext } from "react"
import "./VerifyEmailPage.css"
import { accessTokenContext, userContext } from "../../context/Context"
import { backendUrl } from "../../api/api"

const VerifyEmailPage = () => {
  const { user, setUser } = useContext(userContext)
  const { accessToken } = useContext(accessTokenContext)
  console.log(accessToken)
  // userID = user._id
  // user.isEmailVerified

  const getNewSixDigitCode = async () => {
    const res = await fetch(`${backendUrl}/api/v1/users/sendVerifyEmail`, {
      method: "POST",
      headers: { authorization: `Bearer ${accessToken}` },
    })

    await res.json()
  }

  return (
    <main className="verifyemail">
      <h1>Verify your E-Mail</h1>
      <div className="verifyemail__input-container">
        <label htmlFor="sixDigitCode">Enter your 6-Digit-Code here</label>
        <form className="verifyemail__input-container__inputs">
          <input type="number" name="sixDigitCode" id="sixDigitCode" placeholder="675849" />
          <button>Send</button>
        </form>
      </div>
      {user?.isEmailVerified === false && (
        <div className="verifyemail__input__new-email-container">
          <p>Don't know your 6-digit code? We'll send you a new code by email.</p>
          <button onClick={getNewSixDigitCode}>New 6-Digit-Code</button>
        </div>
      )}
    </main>
  )
}

export default VerifyEmailPage
