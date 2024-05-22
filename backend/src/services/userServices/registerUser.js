import { User } from "../../models/User.js"
import { createPasswortHash } from "../../utils/createPasswortHash.js"
import { createPasswortSalt } from "../../utils/createPasswortSalt.js"
import { createSixDigitCode } from "../../utils/createSixDigitCode.js"

export const registerUser = async ({ firstname, lastname, email, password }) => {
  const user = await User.findOne({ email })

  // Email-Versand mit sixDigitCode

  if (user) throw new Error("User already exists")

  const passwordSalt = createPasswortSalt()
  const passwordHash = createPasswortHash(`${password}${passwordSalt}`)
  const sixDigitCode = createSixDigitCode()

  const createdUser = {
    firstname,
    lastname,
    email,
    passwordHash,
    passwordSalt,
    sixDigitCode,
  }

  await User.create(createdUser)

  // Return machen
  return {
    firstname: createdUser.firstname,
    lastname: createdUser.lastname,
    email: createdUser.email,
  }
}
