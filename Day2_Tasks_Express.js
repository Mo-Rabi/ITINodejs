const express = require("express");
const app = express();
app.use(express.json()); //?Use middleware ("express.json()") for all incoming requests from front-end

let users = [
  { name: "Mo", email: "mo@gmail.com", age: 26, id: 1 },
  { name: "Liv", email: "liv@gmail.com", age: 24, id: 4 },
  { name: "Alex", email: "alex@gmail.com", age: 35, id: 2 },
  { name: "Tabitha", email: "tabitha@gmail.com", age: 42, id: 3 },
];
let posts = [
  {
    userId: 1,
    id: 5,
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
  },
  {
    userId: 1,
    id: 6,
    title: "dolorem eum magni eos aperiam quia",
    body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
  },
  {
    userId: 1,
    id: 7,
    title: "magnam facilis autem",
    body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
  },
  {
    userId: 1,
    id: 8,
    title: "dolorem dolore est ipsam",
    body: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
  },
];
//?              ************************************* Users related tasks*******************************************

//! 1.GetAllUsers
app.get("/", (req, res) => {
  res.json(users);
});

//! 2.AddUser
app.post("/", (req, res) => {
  let { name, email, id } = req.body;
  let isEmailExist = users.find((elem) => {
    elem.email == email;
  });
  if (isEmailExist) {
    res.json({ message: "Email already exists" });
  } else {
    users.push({ name, email, id }); //? When key and value are the same, write them once.
  }

  res.json({ message: `User details were added successfully`, data: req.body });
  //res.send takes a string ends connection , res.json ends connection takes Object and displays array of objects
});

//! 3.Get all users sorted alphabetically by name
app.get("/sort", (req, res) => {
  users.sort((a, b) => {
    //! sort array of user objects by name field
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
  });
  res.json(users);
});

//! 4. delete user
app.delete("/", (req, res) => {
  let { email } = req.body;
  //console.log(email);
  let unDeletedUsers = users.filter((elem) => elem.email != email); //!puts all users except the one to be deleted in new array
  if (unDeletedUsers.length == users.length) {
    res.json({ message: "User not found" });
  } else {
    users = unDeletedUsers;
    res.json({ message: "deleted", users });
  }

  res.json({ message: "User was deleted successfully", data: req.body });
});

//! 5. update whole user(replace it with new resource) bu id using PUT or Partially update a user using PATCH (app.patch)
app.patch("/users/:id", (req, res) => {
  //console.log(typeof(req.params.id))
  const userId = parseInt(req.params.id);
  //console.log(typeof(userId))
  //console.log(req.body)
  const { fieldToUpdate, newValue } = req.body;

  // Find the user with the specified ID
  const user = users.find((user) => user.id === userId);
  //?if found user, gives the user element, in not gives undefined (!undefined => true) so enters first if, and "user not found"
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update the specified field
  if (fieldToUpdate && newValue !== undefined) {
    //? To make sure they hold a value
    console.log(fieldToUpdate);
    console.log(newValue);
    console.log(user);
    user[fieldToUpdate] = newValue; //?Dynamic value of ID (passed through another variable) so use bracket notation
    res.json(user);
  } else {
    res.status(400).json({ message: "Invalid request body" });
  }
});

//! 6. search user by id
app.get("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((elem) => elem.id === userId); //? returns the matched user element
  if (user) {
    res.json(user);
  } else {
    res.status(400).json({ message: "User not found" });
  }
});

//?              ************************************** Posts related tasks*******************************************

//! 1.Get All Posts
app.get("/posts/all", (req, res) => {
  res.json(posts);
});

//! 2.AddPost
app.post("/addPost", (req, res) => {
  let { userId, id, title, body } = req.body;
  posts.push({ userId, id, title, body }); //? When key and value are the same, write them once.

  res.json({
    message: `Your post was added successfully`,
    title: req.body.title,
    body: req.body.body,
  });
  //?res.json ends connection takes Object and displays array of objects, res.send takes a string ends connection ,
});

//! 3.Get all Posts reversed (but don't change the order of the main array)
app.get("/posts/reversed", (req, res) => {
  let reversedPosts = posts.slice().reverse();
  res.json(reversedPosts);
});

//! 4. delete post
app.delete("/post", (req, res) => {
  let { id: postId } = req.body; //?extract the id property from req.body and assign it to a new variable named postId without mutating id property on the request.body
  let index = posts.findIndex((post) => post.id == postId); //? findIndex() returns index of the first element in the array that passes the test. Otherwise, -1.
  if (index !== -1) {
    // If the post with the given ID is found, remove it from the 'posts' array
    posts.splice(index, 1);
    res.json({ message: "Post was deleted successfully" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
  //res.json({ message: "Post was deleted successfully", data: req.body });
});

//! 5. update post
app.patch("/posts/:id", (req, res) => {
  //console.log(typeof(req.params.id))
  const postId = parseInt(req.params.id);
  //console.log(typeof(userId))
  //console.log(req.body)
  const { fieldToUpdate, newValue } = req.body;

  // Find the user with the specified ID
  const post = posts.find((post) => post.id === postId);
  //?if found user, gives the user element, in not gives undefined (!undefined => true) so enters first if, and "user not found"
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // Update the specified field
  if (fieldToUpdate && newValue !== undefined) {
    //? To make sure they hold a value
    console.log(fieldToUpdate);
    console.log(newValue);
    console.log(post);
    post[fieldToUpdate] = newValue; //?Dynamic value of ID (passed through another variable) so use bracket notation
    res.json(post);
  } else {
    res.status(400).json({ message: "Invalid request body" });
  }
});

//! 6. search post by id
app.get("/searchPosts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((elem) => elem.id === postId); //? returns the matched user element
  if (post) {
    res.json(post);
  } else {
    res.status(400).json({ message: "Post not found" });
  }
});
