import express from "express";
import { addMessage, getAllMessages } from "./message.controller.js";
const messagesRoutes = express.Router();

messagesRoutes.post("/message/:id", addMessage);
messagesRoutes.get("/messages/", getAllMessages);

export default messagesRoutes;
