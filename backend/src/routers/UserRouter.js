import express from "express"
import { UserController } from "../controllers/UserController.js"
import { doJwtAuth } from "../middlewares/doJwtAuth.js"

export const UserRouter = express
  .Router()
  .post("/register", UserController.postRegisterUserCtrl)
  .post("/login", UserController.postLoginUserCtrl)
  .post("/sendVerifyEmail", doJwtAuth, UserController.postSendVerifyEmailCtrl)
  .post("/verifyEmail", doJwtAuth, UserController.postVerifyEmailCtrl)
  .patch("/edit", doJwtAuth, UserController.patchEditUserCtrl)
  .delete("/delete", doJwtAuth, UserController.deleteUserCtrl)
  .get("/", doJwtAuth, UserController.getAllUsersCtrl)
