import { UserService } from "../services/index.js"

const postRegisterUserCtrl = async (req, res) => {
  try {
    const result = await UserService.registerUser(req.body)
    res.json({ result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: error.message })
  }
}

const postLoginUserCtrl = async (req, res) => {
  try {
    const result = await UserService.loginUser(req.body)
    res.json({ result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: error.message || "Could not login user" })
  }
}

const postSendVerifyEmailCtrl = async (req, res) => {
  try {
    const authenticatedUserId = req.authenticatedUserClaims.sub
    const result = await UserService.sendVerifyEmail(authenticatedUserId)
    res.json({ result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: error.message || "Could not send email" })
  }
}

const postVerifyEmailCtrl = async (req, res) => {
  try {
    const authenticatedUserId = req.authenticatedUserClaims.sub
    const sixDigitCode = req.body.sixDigitCode

    const result = await UserService.verifyEmail(authenticatedUserId, sixDigitCode)
    res.json({ result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: error.message || "Could not verify email" })
  }
}

const patchEditUserCtrl = async (req, res) => {
  try {
    const authenticatedUserId = req.authenticatedUserClaims.sub
    const userUpdateInfo = req.body
    const result = await UserService.editUser(authenticatedUserId, userUpdateInfo)
    res.json({ result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: error.message || "Could not edit user information" })
  }
}

const deleteUserCtrl = async (req, res) => {
  try {
    const authenticatedUserId = req.authenticatedUserClaims.sub
    const result = await UserService.deleteUser(authenticatedUserId)
    res.json({ result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: error.message || "Could not delete user " })
  }
}

export const UserController = {
  postRegisterUserCtrl,
  postLoginUserCtrl,
  postSendVerifyEmailCtrl,
  postVerifyEmailCtrl,
  patchEditUserCtrl,
  deleteUserCtrl,
}
