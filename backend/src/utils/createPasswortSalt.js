import crypto from "crypto"

export const createPasswortSalt = () => {
  return crypto.randomBytes(64).toString("hex")
}
