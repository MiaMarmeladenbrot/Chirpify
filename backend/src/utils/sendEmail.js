import { google } from "googleapis"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config({ path: "../../.env" })

const CLIENT_ID = process.env.GMAIL_CLIENT_ID
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN
const GMAIL_ADDRESS = process.env.GMAIL_ADDRESS

// console.log({ CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, GMAIL_ADDRESS })

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

export const sendEmail = async ({ to, subject, text }) => {
  try {
    const ACCESS_TOKEN = await oAuth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GMAIL_ADDRESS,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
      },
    })

    const sentMessageInfo = await transporter.sendMail({
      from: "From Mia & Thomas from Chirpify",
      to,
      subject,
      text,
      html: text.replaceAll("\n", "<br/>"),
    })

    const success = sentMessageInfo.accepted.includes(to)
    return success
  } catch (error) {
    console.log(error)
    return false
  }
}
