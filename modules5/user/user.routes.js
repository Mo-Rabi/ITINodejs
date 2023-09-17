import express from "express";
import {
  signUp,
  getAllUsers,
  signIn,
  userSignUpVerification,
} from "./user.controller.js";
import { signInSchem, signUpValidationSchema } from "./user.validation.js";
import { validation } from "../../middleware/validation.js";

const userRoutes = express.Router();

userRoutes.get("/users", getAllUsers);

userRoutes.post("/user/signUp", validation(signUpValidationSchema), signUp);
userRoutes.post("/user/login", validation(signInSchem), signIn);
userRoutes.get("/user/verify/:token", userSignUpVerification);

//userRoutes.post("/user/signUp", validationParams(signUpValidationSchema), signUp);
//userRoutes.post("/user/login", validationParams(signInSchem), signIn);

export default userRoutes;
