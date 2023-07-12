//----------> import packages
require("dotenv").config();
const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");
const { connectToDatabase } = require("./utils/database");
const swaggerUI = require("swagger-ui-express");

//----------> documentation
const swaggerDocumentation = require("./documentation/swaggerDocumentation");

//---------->routers
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

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

//----------> routes
app.use("/admin", adminRouter);
app.use("", shopRouter);

//----------> Environment variables
const { PORT = 5000, MONGO_URI } = process.env;

//----------> Listen to the server
const start = async () => {
  //----------> connect to database
  await connectToDatabase(MONGO_URI);

  //----------> listen to server
  app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
  });
};

//----------> Start server
start();
