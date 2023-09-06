let users = [
  { name: "Mostafa", age: 26, id: 1 },
  { name: "Mohammad", age: 35, id: 2 },
  { name: "Ahmed", age: 42, id: 3 },
  { name: "Chloe", age: 21, id: 4 },
];
const httpServer = require("http");
const server = httpServer.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.end("<h1>This is the homepage</h1>");
  } else if (req.url === "/addUser" && req.method === "POST") {
    req.on("data", (chunck) => {
      //! data coming in the request
      users.push(JSON.parse(chunck));
      res.end(`User details were added successfully: ${chunck}`);
    });
  } else if (req.url === "/getUsers" && req.method === "GET") {
    res.end(JSON.stringify(users)); //! get all users
    //res.setHeader("Content-Type", "application/json");
  } else if (req.url === "/getSortedUsers" && req.method === "GET") {
    users.sort((a, b) => {
      //! sort array of user objects by name field
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
    });
    //res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(users));
  }
  //!Delete User
  else if (req.url === "/deleteUser" && req.method === "DELETE") {
    req.on("data", (chunck) => {
      //! id to be deleted which is sent in the req gets stored in the chunck variable
      let userId = JSON.parse(chunck).id;
      users.forEach((user) => {
        if (user.id == userId) {
          users.splice(user, 1);
        }
      });
      res.end(`User with ID: ${userId} was deleted successfully.`);
    });

    //!Update User
  } else if (req.url === "/updateUser" && req.method === "UPDATE") {
    req.on("data", (chunck) => {
      //! id to be updated which is sent in the req gets stored in the chunck variable
      let userId = JSON.parse(chunck).id;
      users.forEach((user) => {
        if (user.id == userId) {
          users.splice(user, 1);
        }
      });
      res.end(`User with ID: ${userId} was deleted successfully.`);
    });
  } else if (req.url === "/login" && req.method === "GET") {
    res.end("Login");
  } else if (req.url === "/about" && req.method === "GET") {
    res.end("About us");
  } else {
    res.end("Not Found");
  }
});

server.listen(5500);
