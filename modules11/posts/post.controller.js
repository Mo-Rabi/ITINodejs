import postModel from "../../db/model/post.model.js";

//! 1.Add a new post✅
const addPost = async (req, res) => {
  let addedPost = await postModel.insertMany(req.body);
  res.json({ message: "Post was added successfully", addedPost });
};

//! 2.Retrieve all posts✅
const getAllPosts = async (req, res) => {
  let viewPosts = await postModel.find();
  res.json({ message: "Here's a list of all posts", viewPosts });
};

//! 3.Update post details using ID✅
const updatePost = async (req, res) => {
  let { id } = req.params;
  let updatedPost = await postModel.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      body: req.body.body,
    },
    { new: true }
  );
  res.json({
    message: "Post was updated successfully",
    updatedPost: updatedPost,
  });
};

//! 4.Delete a post✅
const deletePost = async (req, res) => {
  let { id } = req.params;
  let deletedPost = await postModel.findByIdAndDelete(id);

  if (deletedPost) {
    res.json({ message: "Deleted", deletedPost });
  } else {
    res.status(404).json({ message: "Post was not found" });
  }
};

//! 5.Search for posts using title substrings✅
const findPost = async (req, res) => {
  let { keyword } = req.params;
  let viewPost = await postModel.find({ $text: { $search: keyword } }); //{ title: { $regex: new RegExp(keyword), $options: 'i' } }
  res.json({ message: "We have found the posts", viewPost });
};

//! 6.get user profile with user posts(using populate) => populate has bad performance show I'm using Aggregation framework $Lookup
// const getuserProfile = async (req, res) => {
//   let userAndPosts = await postModel.aggregate([
//     /**
//  * from: The target collection.
//  * localField: The local join field.
//  * foreignField: The target join field.
//  * as: The name for the results.
//  * pipeline: Optional pipeline to run on the foreign collection.
//  * let: Optional variables to use in the pipeline field stages.
//  */
// {
//   from: "Course",
//   localField: "courses.CoursesIDs",
//   foreignField: "CourseID",
//   as: "CoursesData",
// }
//   ])
// };

export { getAllPosts, addPost, updatePost, deletePost, findPost };
