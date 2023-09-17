import express from "express";
const app = express();
import userRoutes from "./modules/users/user.routes.js";
import postRoutes from "./modules/posts/post.routes.js";
import { initConnection } from "./db/connection.js";
const port = 3000;
app.use(express.json());

//*************************************** Using Cloud ********************************************/
// const { MongoClient } = require("mongodb");

// // Replace the uri string with your connection string.
// const uri = "mongodb+srv://admin:admin@clusterm0.srqbfxy.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri);

// async function run() {
//   try {
//     const database = client.db('sample_mflix');
//     const movies = database.collection('movies');

//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);

//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

//*************************************** Using Cloud ********************************************/

initConnection();
app.use(userRoutes);
app.use(postRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`App is running on port: ${port}!`));
