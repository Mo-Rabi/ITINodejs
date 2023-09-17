import express from "express";
import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  findUser,
  getUserProfileWithPosts,
  validateUser,
  findUser2,
} from "./user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/users", getAllUsers);

userRoutes.post("/addUser", addUser);

userRoutes.patch("/:id", updateUser);

userRoutes.delete("/:id", deleteUser);

userRoutes.get("/:x/:y", findUser);

userRoutes.get("/search/:x/:y", findUser2);

userRoutes.get("/users/:id", getUserProfileWithPosts);

userRoutes.post("/login", validateUser);

export default userRoutes;
