require("dotenv").config();
//----------> import packages
const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");
const { connectToDatabase } = require("./utils/database");
const User = require("./models/user");
const swaggerUI = require("swagger-ui-express");

//----------> documentation
const swaggerDocumentation = require("./documentation/swaggerDocumentation");

//---------->routers
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

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

app.use("/", async (req, res, next) => {
  User.find()
    .then((user) => {
      req.user = user[0]; //----------> because we know only one user will show;
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
  //----------> check if user exists
  let user = await User.find();
  if (!user.length) {
    user = new User({ name: "omooladev", email: "omooladev@gmail.com" });
    await user.save();
  }
  //----------> listen to server
  app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
  });
};

//---------->initialize the start server
start();
