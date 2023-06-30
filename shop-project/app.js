//important------> import packages
const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");
const swaggerUI = require("swagger-ui-express");

//----------> documentation
const swaggerDocumentation = require("./documentation/swaggerDocumentation");

//? routes
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

//important-----> Initialize application
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

//important-----> middlewares
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.join(__dirname, "public")));

//----------> documentation route
app.use("/api/docs", swaggerUI.serve);
app.use("/api/docs", swaggerUI.setup(swaggerDocumentation));

app.use("/admin", adminRouter);
app.use("", shopRouter);

//important-----> Listen to the server
const start = () => {
  app.listen(5000, () => {
    console.log("Server is listening at port 5000");
  });
};

//important-----> Start server
start();
