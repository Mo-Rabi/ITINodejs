import mongoose from "mongoose";
//import postModel from "./post.model";
const userSechema = new mongoose.Schema(
  {
    userName: String,
    age: Number,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,
    posts: [ //! Will work with Lookup, but not populate
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);
//? An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.
const userModel = mongoose.model("User", userSechema);
//!we can call this user singular, then call it as users (in collectopn), products..etc //*model == collection //*User = Users = users هوا في الآخر هيروح لإسم الكولكشن في الداتا بيز

export default userModel;

//model == collection
//User = Users = users هوا في الآخر هيروح لإسم الكولكشن في الداتا بيز
