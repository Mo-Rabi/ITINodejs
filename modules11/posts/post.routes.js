import express from "express";
import {
  getAllPosts,
  addPost,
  updatePost,
  deletePost,
  findPost,
} from "./post.controller.js";

const postRoutes = express.Router();

postRoutes.get("/posts", getAllPosts);

postRoutes.post("/addPost", addPost);

postRoutes.patch("/posts/:id", updatePost);

postRoutes.delete("/posts/:id", deletePost);

postRoutes.get("/posts/search/:keyword", findPost);

export default postRoutes;
