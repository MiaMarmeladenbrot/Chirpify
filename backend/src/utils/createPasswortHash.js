import crypto from "crypto"

export const createPasswortHash = (inputString) => {
  return crypto.createHash("sha512").update(inputString).digest("hex")
}
