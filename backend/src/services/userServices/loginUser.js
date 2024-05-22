import { User } from "../../models/User.js";
import { createPasswortHash } from "../../utils/createPasswortHash.js";
import { createToken } from "../../utils/createToken.js";

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Something went wrong.");

  const passwordHash = createPasswortHash(`${password}${user.passwordSalt}`);
  const correctPassword = passwordHash === user.passwordHash;
  if (!correctPassword) throw new Error("Something went wrong.");

  const accessToken = createToken(user, "access");
  const refreshToken = createToken(user, "refresh");

  return {
    user: {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
    },
    tokens: { accessToken, refreshToken },
  };
}
