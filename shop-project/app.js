//important------> import packages
const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

//important-----> Initialize application
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.join(__dirname, "public")));
//important-----> middlewares
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
