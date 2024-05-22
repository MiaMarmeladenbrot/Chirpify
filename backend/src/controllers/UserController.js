import { UserService } from "../services/index.js";

const postRegisterUserCtrl = async (req, res) => {
  try {
    const result = await UserService.registerUser(req.body);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: error.message });
  }
};

const postLoginUserCtrl = async (req, res) => {
  try {
    const result = await UserService.loginUser(req.body);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error, message: error.message || "Could not login user" });
  }
};

const postSendVerifyEmailCtrl = async (req, res) => {
  try {
    const authenticatedUserId = req.authenticatedUserClaims.sub;
    const result = await UserService.sendVerifyEmail(authenticatedUserId);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error, message: error.message || "Could not send email" });
  }
};

const postVerifyEmailCtrl = async (req, res) => {
  try {
    const authenticatedUserId = req.authenticatedUserClaims.sub;
    const sixDigitCode = req.body.sixDigitCode;

    const result = await UserService.verifyEmail(
      authenticatedUserId,
      sixDigitCode
    );
    res.json({ result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error, message: error.message || "Could not verify email" });
  }
};

export const UserController = {
  postRegisterUserCtrl,
  postLoginUserCtrl,
  postSendVerifyEmailCtrl,
  postVerifyEmailCtrl,
};
