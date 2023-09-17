import mongoose from "mongoose";
//? or import { Schema,model } from "mongoose"; then const postSchema = new Schema({}) && postModel = model(,)

//import userModel from "./user.model";
const postSchema = new mongoose.Schema(
  {
    userId: Number,
    postId: Number,
    title: String,
    body: String,
    author: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

postSchema.index({ title: "text" }); //create index(whole words) on title field or use regex(match substrings)

//? An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.
const postModel = mongoose.model("Post", postSchema);
//* Post here refers to the collection name, collection name is "posts" in ourj DB plural (as it contains documents) 

export default postModel;
