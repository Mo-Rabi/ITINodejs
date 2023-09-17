import express from "express";
import { initConnection } from "./db/connection.js";
import userRoutes from "./modules/user/user.routes.js";
import messagesRoutes from "./modules/message/message.routes.js";
import cors from "cors";


const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({origin: '*'}));//? allows all requests from anywhere to my server (better to specify later after going live in production)

initConnection();

app.use(userRoutes);
app.use(messagesRoutes);
app.listen(port, () => console.log(`App is running on port ${port}!`));
