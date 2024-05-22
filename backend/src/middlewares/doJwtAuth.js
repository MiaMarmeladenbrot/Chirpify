import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const jwtSecret = process.env.JWT_SECRET

export async function doJwtAuth(req, res, next) {
  const _invalidAuth = () => res.status(401).json({ message: "Invalid auth" })

  if (!req.headers.authorization) return _invalidAuth()

  const [authType, tokenString] = req.headers.authorization.split(" ")
  if (authType !== "Bearer" || !tokenString) return _invalidAuth()

  try {
    const verifiedClaims = jwt.verify(tokenString, jwtSecret)
    req.authenticatedUserClaims = verifiedClaims
    next()
  } catch (error) {
    console.log(error)
    return _invalidAuth()
  }
}
