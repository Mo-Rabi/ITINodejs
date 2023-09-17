import express from "express";
import { addMessage, getAllMessages } from "./message.controller.js";
import auth from "../../middleware/auth.js";
const messagesRoutes = express.Router();

messagesRoutes.post("/message/:id",auth, addMessage);
messagesRoutes.get("/messages/", auth, getAllMessages);

export default messagesRoutes;
