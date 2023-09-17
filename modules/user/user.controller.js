import userModel from "../../db/model/user.model.js";
import bcrypt from "bcrypt";
import { signInSchem, signUpValidationSchema } from "./user.validation.js";

//! Retrieve all users
const getAllUsers = async (req, res) => {
  let viewUsers = await userModel.find();
  res.json({ message: "Here's a list of all users", viewUsers });
};

//! Sign up(email must be unique )
const signUp = async (req, res) => {
  try {
    let { error } = signUpValidationSchema.validate(req.body, {
      abortEarly: false,
    }); //abortEarly false let's the validate method continue to validate all fields even after facing a validation error. normally it stops at the first error.
    console.log(error, "validation Result");
    if (error) {
      res.status(400).json({ message: "Validation error", error });
    } else {
      let { email } = req.body;
      let foundUser = await userModel.findOne({ email: email }); // findOne returns either a single document (if a match is found) or null (if no match is found). find() returns a query object so always truthy
      foundUser && res.status(409).json({ message: "Email already exists" }); //? if foundUser is truthy it will go to right side of && operator.
      //!This is called short-circuit ecaluation
      //*If foundUser is truthy (i.e., it exists), then the second operand is executed. If foundUser is falsy (i.e., it doesn't exist), then the second operand is not executed, and the && operation returns foundUser
      // or use if (foundUser) {
      //   res.status(409).json({ message: "Email already exists" });
      if (!foundUser) {
        let hashedPassword = bcrypt.hashSync(req.body.password, 10);
        let addedUser = await userModel.insertMany({
          ...req.body,
          password: hashedPassword,
        });
        res.status(201).json({ message: "SignUp successful", addedUser });
      }
    }
  } catch (error) {
    res.status(400).json({ message: "error", error });
  }
};

//! Sign in
const signIn = async (req, res) => {
  let { error } = signInSchem.validate(req.body);
  if (error) {
    res.status(400).json({ message: "Error", error });
  } else {
    let foundUser = await userModel.findOne({ email: req.body.email });

    if (foundUser) {
      //console.log(foundUser.password, req.body.password) //comparing hashed password in the DB with unhashed password we're getting from the user
      let matched = bcrypt.compareSync(req.body.password, foundUser.password);
      if (matched) {
        res.status(200).json({ message: "You're logged in :)" });
      } else {
        res.status(404).json({ message: "Please check your password" });
      }
    } else {
      res
        .status(404)
        .json({ message: "User not found, You need to create an account" });
    }
  }
};

export { signUp, getAllUsers, signIn };
