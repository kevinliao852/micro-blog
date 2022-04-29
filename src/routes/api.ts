import { Router } from "express";
import { userController } from "../controllers";

const userRoute = Router();

const { getUsers, getUserById, register, update, remove, login } =
  userController;

userRoute.get("/", getUsers);
userRoute.get("/:id", getUserById);
userRoute.post("/login", login);
userRoute.post("/register", register);
userRoute.put("/:id", update);
userRoute.delete("/:id", remove);

export const userRouter = userRoute;
