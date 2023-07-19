require("dotenv").config();
//----------> import packages

const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");
const { connectToDatabase } = require("./utils/database");
const swaggerUI = require("swagger-ui-express");
const { getDatabase } = require("./utils/database");
const mongodb = require("mongodb");
//----------> documentation
const swaggerDocumentation = require("./documentation/swaggerDocumentation");

//---------->routers
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const User = require("./models/user");

//----------> Initialize application
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

//----------> middlewares
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.join(__dirname, "public")));

//----------> documentation route
app.use("/api/docs", swaggerUI.serve);
app.use("/api/docs", swaggerUI.setup(swaggerDocumentation));

//----------> This is just a route for getting a default user from database to work with
app.use("/", (req, res, next) => {
  const database = getDatabase();
  database
    .collection("users")
    .findOne({ _id: new mongodb.ObjectId("64b04dcc3802e1e620d3a309") })
    .then(({ _id, name, email, cart }) => {
      req.user = new User(_id, name, email, cart);
      next();
    })
    .catch((error) => console.log(error));
});

//----------> routes
app.use("/admin", adminRouter);
app.use("", userRouter);

//----------> Environment variables
const { PORT = 5000, MONGO_URI } = process.env;


//---------->start server function
const start = async () => {
  //----------> connect to database
  await connectToDatabase(MONGO_URI);
  //----------> listen to server
  app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
  });
};

//---------->initialize the start server
start();
