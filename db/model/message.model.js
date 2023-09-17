import { Schema, model, Types } from "mongoose";

const messageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    messageContent: {
      type: String,
      required: true,
    },
    receiverId: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = model("Message", messageSchema);

export default messageModel;
