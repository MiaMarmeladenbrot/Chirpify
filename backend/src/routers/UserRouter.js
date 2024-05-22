import express from "express";
import { UserController } from "../controllers/UserController.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";

export const UserRouter = express
  .Router()
  .post("/register", UserController.postRegisterUserCtrl)
  .post("/login", UserController.postLoginUserCtrl)
  .post("/sendVerifyEmail", doJwtAuth, UserController.postSendVerifyEmailCtrl);
