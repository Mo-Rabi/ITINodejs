import express from "express";
import { initConnection } from "./db/connection.js";
import userRoutes from "./modules/user/user.routes.js";
import messagesRoutes from "./modules/message/message.routes.js";


const app = express();
const port = 3000;

app.use(express.json());

initConnection();

app.use(userRoutes);
app.use(messagesRoutes)
app.listen(port, () => console.log(`App is running on port ${port}!`));
