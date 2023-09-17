import express from "express";
import { signUp, getAllUsers, signIn } from "./user.controller.js";
import { signInSchem, signUpValidationSchema } from "./user.validation.js";
import {validation, validationParams} from "../../middleware/validation.js";

const userRoutes = express.Router();

userRoutes.post("/user/signUp", validation(signUpValidationSchema), signUp);
userRoutes.post("/user/signUp", validationParams(signUpValidationSchema), signUp);

userRoutes.post("/user/login", validation(signInSchem), signIn);
userRoutes.post("/user/login", validationParams(signInSchem), signIn);

userRoutes.get("/users", getAllUsers);

export default userRoutes;
