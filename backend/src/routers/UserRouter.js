import express from "express";
import { UserController } from "../controllers/UserController.js";

export const UserRouter = express
  .Router()
  .post("/register", UserController.postRegisterUserCtrl)
  .post("/login", UserController.postLoginUserCtrl);
