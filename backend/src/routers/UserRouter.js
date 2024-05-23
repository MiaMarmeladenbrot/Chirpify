import express from "express";
import { UserController } from "../controllers/UserController.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";

export const UserRouter = express
  .Router()
  .post("/register", UserController.postRegisterUserCtrl)
  .post("/login", UserController.postLoginUserCtrl)
  .post("/sendVerifyEmail", doJwtAuth, UserController.postSendVerifyEmailCtrl)
  .post("/verifyEmail", doJwtAuth, UserController.postVerifyEmailCtrl)
  .patch("/edit", doJwtAuth, UserController.patchEditUserCtrl)
  .patch("/follow/:userId", doJwtAuth, UserController.followUserCtrl)
  .delete("/delete", doJwtAuth, UserController.deleteUserCtrl)
  .get("/:userId", doJwtAuth, UserController.getOneUserCtrl)
  .get("/", doJwtAuth, UserController.getAllUsersCtrl);
