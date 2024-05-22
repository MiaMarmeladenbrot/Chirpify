import { User } from "../../models/User.js"
import { createPasswortHash } from "../../utils/createPasswortHash.js"
import { createPasswortSalt } from "../../utils/createPasswortSalt.js"
import { createSixDigitCode } from "../../utils/createSixDigitCode.js"
import { sendEmail } from "../../utils/sendEmail.js"

export const registerUser = async ({ firstname, lastname, email, password, username }) => {
  const user = await User.findOne({ email })

  if (user) throw new Error("User already exists")

  const passwordSalt = createPasswortSalt()
  const passwordHash = createPasswortHash(`${password}${passwordSalt}`)
  const sixDigitCode = createSixDigitCode()

  const createdUser = await User.create({
    firstname,
    lastname,
    username,
    email,
    passwordHash,
    passwordSalt,
    sixDigitCode,
  })

  await sendEmail({
    to: createdUser.email,
    subject: "Welcome to Chirpify",
    text: `Hi ${createdUser.firstname} ${createdUser.lastname},
    Welcome to your Chirpify registration.
    Please Login and enter your 6 Digit Code to verify your E-Mail: ${createdUser.sixDigitCode}`,
  })

  return {
    _id: createdUser._id,
    firstname: createdUser.firstname,
    lastname: createdUser.lastname,
    email: createdUser.email,
  }
}
