import { User } from "../../models/User.js";
import { sendEmail } from "../../utils/sendEmail.js";

export async function sendVerifyEmail(authenticatedUserId) {
  // userId von authorization middleware
  // sendEmail(to, subject, text) aufrufen -> Code an User senden
  // return "success"

  const user = await User.findById(authenticatedUserId);

  const success = sendEmail({
    to: user.email,
    subject: "Your six digit code",
    text: `Lost your six digit code? No problem! Here it is again: ${user.sixDigitCode}}`,
  });

  return success;
}
