import userModel from "../../db/model/user.model.js";

//! 1.Sign up ( email must be unique )
const addUser = async (req, res) => {
  let { email } = req.body;
  let isEmailExist = await userModel.findOne({ email: email }); // findOne returns either a single document (if a match is found) or null (if no match is found). find returns a query object so always truthy

  if (isEmailExist) {
    res.json({ message: "Email already exists" });
  } else {
    let addedUser = await userModel.insertMany(req.body);
    res.json({ message: "SignUp successful", addedUser });
  }
};

//! 2.Sign in
const validateUser = async (req, res) => {
  let { email } = req.body;
  let isEmailExist = await userModel.findOne({ email: email }); // findOne returns either a single document (if a match is found) or null (if no match is found). find returns a query object so always truthy

  if (isEmailExist) {
    res.json({ message: "You're logged in :)" });
  } else {
    res.json({ message: "Please check your email :(" });
  }
};

//! 2.Retrieve all users
const getAllUsers = async (req, res) => {
  let viewUsers = await userModel.find();
  res.json({ message: "Here's a list of all users", viewUsers });
};

//! 3.Update user details (user)
const updateUser = async (req, res) => {
  let { id } = req.params;
  let updatedUser = await userModel.findByIdAndUpdate(
    //??!takes (_id only not key id in req.body)
    id,
    {
      userName: req.body.userName,
      age: req.body.age,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true }
  );
  res.json({
    message: "User was updated successfully",
    updatedUser: updatedUser,
  });
};

//! 4.Delete a user
const deleteUser = async (req, res) => {
  let { id } = req.params;
  let deletedUser = await userModel.findByIdAndDelete(id);

  if (deletedUser) {
    res.json({ message: "Deleted", deletedUser });
  } else {
    res.json({ message: "User not found" });
  }
};

//! 5.1 Search for users where with age between X and Y
const findUser = async (req, res) => {
  let { x, y } = req.params;
  let viewUsers = await userModel.find({
    $and: [{ age: { $gte: x } }, { age: { $lte: y } }],
  });
  res.json({ message: "We have found the users", viewUsers });
};

//! 5.2 Search for user with name starting with X and age is less than Y
const findUser2 = async (req, res) => {
  let { x, y } = req.params;
  console.log(x, y);
  let viewUser = await userModel.find({
    $and: [
      { userName: { $regex: `^${x}`, $options: "i" } }, // Case-insensitive regex
      { age: { $lt: y } },
    ],
  });
  res.json({ message: "We have found the user", viewUser });
};

//! 6.get user profile with user posts(using populate)
// const getUserProfileWithPosts = async (req, res) => {
//   try {
//     let { id } = req.params;
//     const userAndPosts = await userModel.findById(id).populate("posts"); // Find a user by id and populate their posts

//     res.json({ message: "User and their posts", userAndPosts });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "An error occurred" });
//   }
// };

//! 6.get user profile with user posts populate has bad performance show I'm using Aggregation framework $Lookup
const getUserProfileWithPosts = async (req, res) => {
  let { id } = req.params;
  let userAndPosts = await userModel.aggregate([
    { $match: { _id: id } },
    {
      $lookup: {
        from: "Post", // The target collection(model).
        localField: "userId", // The local join field.
        foreignField: "userId", // The target join field.
        as: "posts", // The name for the results.
      },
    },
  ]);
  //.toArray();
  res.json({ message: "User and their posts", userAndPosts });
};

//! ************************************************************ Post APIs *******************************************************

export {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  findUser,
  getUserProfileWithPosts,
  validateUser,
  findUser2,
};
