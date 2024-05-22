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

export const UserController = { postRegisterUserCtrl }
