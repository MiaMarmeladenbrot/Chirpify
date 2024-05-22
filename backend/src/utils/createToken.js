import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function createToken(user, tokenType = "access") {
  const jwtSecret = process.env.JWT_SECRET;

  const issuedAtMilliseconds = Math.ceil(Date.now() / 1000);

  const tokenPayload = {
    sub: user._id,
    type: tokenType,
    iat: issuedAtMilliseconds,
  };

  const expiresIn =
    {
      access: "1h",
      refresh: "2w",
    }[tokenType] || "10min";

  const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn });
  return token;
}
