import "./LoginPage.css"
import { useContext, useState } from "react"
import { backendUrl } from "../../api/api"
import { useNavigate } from "react-router-dom"
import { accessTokenContext, userContext } from "../../context/Context"
import HeaderNav from "../../components/HeaderNav/HeaderNav"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setUser } = useContext(userContext)
  const { setAccesToken } = useContext(accessTokenContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch(`${backendUrl}/api/v1/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = res.json()

    setUser(data)
    setAccesToken(data.tokens.accessToken)

    if (user.isEmailVerified === false && data.tokens.accessToken) {
      navigate("/settings")
    }

    navigate("/feed")
    setEmail("")
    setPassword("")
  }

  return (
    <>
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
    </>
  )
}

export default LoginPage
