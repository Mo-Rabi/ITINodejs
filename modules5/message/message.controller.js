import messageModel from "../../db/model/message.model.js";
import jwt from "jsonwebtoken";

//! Send a new secret message
const addMessage = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, messageContent } = req.body;
    let addedMessage = await messageModel.insertMany({
      title,
      messageContent,
      receiverId: id,
    });
    res
      .status(201)
      .json({ message: "Your message was sent successfully", addedMessage });
  } catch (error) {
    res.status(400).json({ message: "An Error happened =>", error });
  }
};

//! Retrieve all messages
const getAllMessages = async (req, res) => {
  let allMessages = await messageModel.find().populate("receiverId");
  res.json({ message: "Here's a list of all users", allMessages });
};

export { addMessage, getAllMessages };
