import { useContext } from "react"
import { accessTokenContext } from "../../context/Context"
import { Navigate } from "react-router-dom"
// Access Token exist => GetAll + GetOne

const AuthRequiredLogin = ({ children }) => {
  const { accessToken } = useContext(accessTokenContext)

  return accessToken ? children : <Navigate to="/login" />
}

export default AuthRequiredLogin
